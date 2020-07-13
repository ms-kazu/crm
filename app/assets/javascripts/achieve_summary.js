var user_name = getDOM('user_name').value;

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);

  $(document).ready(async function(){
    (() => {
      $('#left_input_0').prop('checked',true);
      $('.left_bar_base a:eq(1) .cell').addClass('selected');
      jQuery(function($) {
        $.extend( $.fn.dataTable.defaults, {
          language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
          }
        });
      });
    })();

    const desc_objs_list = async () => {
      let today = new Date();

      let pt0_0 = today.dD();
      let pt0_1 = today.aD(-1).dD();
      let pt0_2 = today.aD(-7).dD();

      let pt1_0_s = today.aD(-6).dD();
      let pt1_0_e = today.dD();
      let pt1_1_s = today.aD(-13).dD();
      let pt1_1_e = today.aD(-7).dD();
      let pt1_2_s = today.aD(-20).dD();
      let pt1_2_e = today.aD(-14).dD();

      let pt2_0_s = `${today.dMS().dD()}`;
      let pt2_0_e = `${today.dD()}`;
      let pt2_1_s = `${today.aM(-1).dMS().dD()}`;
      let pt2_1_e = `${today.aM(-1).dMET().dD()}`;
      let pt2_2_s = `${today.aM(-12).dMS().dD()}`;
      let pt2_2_e = `${today.aM(-12).dMET().dD()}`;

      const sender_data = {
        pt0:{_0:[pt0_0,pt0_0],_1:[pt0_1,pt0_1],_2:[pt0_2,pt0_2]},
        pt1:{_0:[pt1_0_s,pt1_0_e],_1:[pt1_1_s,pt1_1_e],_2:[pt1_2_s,pt1_2_e]},
        pt2:{_0:[pt2_0_s,pt2_0_e],_1:[pt2_1_s,pt2_1_e],_2:[pt2_2_s,pt2_2_e]}
      }

      let result = await ajax_api_function("achieve_summary",sender_data);
      if (result.dataExists) {
        desc_table(result,sender_data);
      } else {
        alert(`データ通信エラー:${result.reason}`);
      }
    }
    const desc_table = (result,so) => {
      const desc_content = () => {
        let pt = Number($('input[name="segment_input_"]:checked').prop('id').split('_')[2]);
        let st = Number($('#segment_select option:selected').prop('value'));
        let c0_ta = ["前日比","1週間前比","1ヶ月前比"];
        let c1_ta = ["7日前比","2週間前比","1年前比"];
        let tia = [`<i class="fas fa-clinic-medical"></i>`,`<i class="fas fa-user-tie"></i>`];
        let objs = [result.data.data_cl,result.data.data_sf];

        let ps = so[`pt${pt}`]._0[0];
        let pe = so[`pt${pt}`]._0[1];

        let obj = objs[st];
        let data_objs = result.data.data[st][pt];
        let ap = ``;

        obj.forEach((cell) => {
          let result_pt0 = data_objs[0].filter(({obj_id}) => obj_id == cell.obj_id);
          let result_pt1 = data_objs[1].filter(({obj_id}) => obj_id == cell.obj_id);
          let result_pt2 = data_objs[2].filter(({obj_id}) => obj_id == cell.obj_id);

          let at0 = result_pt0.reduce((a,b) => a + b.mado,0) || 0;

          let at1 = result_pt0.reduce((a,b) => a + b.m_mado,0) || 0;
          let at1_s = at0.to_perate(at1).perate_str();

          let at2 = result_pt1.reduce((a,b) => a + b.mado,0) || 0;
          let at2_s = at0.to_rate(at2).rate_str();

          let at3 = result_pt2.reduce((a,b) => a + b.mado,0) || 0;
          let at3_s = at0.to_rate(at3).rate_str();

          ap +=
          `
          <tr>
            <th>
              <a href="/achieve_analytics?st=${st+1}&ss=true&si=${cell.obj_id}&pt=0&psel=true&ps=${ps}&pe=${pe}">
                ${user_name==MSD_smn?`${stna[st+1]}${cell.obj_id}`:cell.obj_name}
              </a>
            </th>
            <td>¥${at0.toLocaleString()}</td>
            <td>${at1_s}</td>
            <td>${at2_s}</td>
            <td>${at3_s}</td>
          </tr>
          `;
        });

        $('#table_list').html(
          `
          <table id="list_table">
            <thead>
              <tr>
                <th>${tia[st]}</th>
                <th>窓口売上</th>
                <th>目標達成率</th>
                <th>${c0_ta[pt]}</th>
                <th>${c1_ta[pt]}</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );
        let table = $('#list_table').DataTable({
          columnDefs:[{type:'currency',targets:[1,2,3,4]}],
          lengthMenu: [10,20,30,40,50],
          displayLength:10,
          lengthChange: true,
          searching: true,
          ordering: true,
          info: true,
          paging: true,
          order:[]
        });
      }
      $(document).off('click','input[name="segment_input_"]').on('click','input[name="segment_input_"]',function() {
        desc_content();
      });
      $(document).off('change','#segment_select').on('change','#segment_select',function() {
        desc_content();
      });
      desc_content();
    }
    desc_objs_list();
  });
}
