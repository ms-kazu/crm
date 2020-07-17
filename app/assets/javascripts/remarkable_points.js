var user_name = getDOM('user_name').value;

var sender_objs = {}
var desc_function = (sender) => {
  const desc_content = () => {
    let cpt = $('#cpt').prop('checked');
    let pt = $('input[name="pt_"]:checked').prop('value');
    let ps = getDOM('pi_s').value;
    let pe = getDOM('pi_e').value;
    let st = Number($('#segment_select option:selected').prop('value'));
    let objs = sender_objs.data[st];
    let c_objs = sender_objs.data_c[st];

    let tia = [`<i class="fas fa-clinic-medical"></i>`,`<i class="fas fa-user-tie"></i>`];

    let ap = ``;
    objs.forEach((cell) => {
      let data0 = cell.data_0 || 0;
      let data1 = cell.data_1 || 0;
      let data2 = cell.data_2 || 0;
      let data3 = cell.data_3 || 0;
      let data4 = cell.data_4 || 0;
      let data5 = cell.data_5 || 0;
      let data6 = cell.data_6 || 0;
      let data7 = cell.data_7 || 0;
      let data8 = cell.data_8 || 0;

      let new_p_all = data4.to_perate(data2);
      let repeat_p_all = data5.to_perate(data2);
      let ave_count = data2.to_Perate(data3);
      let jihi_rate = data1.to_perate(data0);
      let jihi_cup = data1.to_devide(data2);
      let hup = data1.to_devide(data6);
      let new_repeat = data8.to_perate(data4);
      let total_repeat = data5.to_perate(data7);


      let at0 = data0.toLocaleString();
      let at1 = data3.toLocaleString();
      let at2 = data2.toLocaleString();
      let at3 = repeat_p_all;
      let at4 = new_p_all;
      let at5 = ave_count;
      let at6 = jihi_rate.toLocaleString();
      let at7 = jihi_cup.toLocaleString();
      let at8 = hup.toLocaleString();
      let at9 = data1.toLocaleString();
      let at10 = new_repeat;
      let at11 = total_repeat;

      if (!cpt) {
        ap +=
        `
        <tr>
          <th>
            <a href="/achieve_analytics?st=${st+1}&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
              ${user_name==MSD_smn?`${stna[st+1]}${cell.obj_id}`: cell.obj_name}
            </a>
          </th>
          <td>¥${at0}</td>
          <td>${at1}</td>
          <td>${at2}</td>
          <td>${at3}%</td>
          <td>${at4}%</td>
          <td>${at5}</td>
          <td>${at6}%</td>
          <td>¥${at7}</td>
          <td>¥${at8}</td>
          <td>¥${at9}</td>
          <td>${at10}%</td>
          <td>${at11}%</td>
        </tr>
        `;
      } else {
        let c_cells = c_objs.filter(({obj_id}) => obj_id == cell.obj_id);
        let c_cell = c_cells.length == 1 ? c_cells[0] : {};

        let c_data0 = c_cell.data_0 || 0;
        let c_data1 = c_cell.data_1 || 0;
        let c_data2 = c_cell.data_2 || 0;
        let c_data3 = c_cell.data_3 || 0;
        let c_data4 = c_cell.data_4 || 0;
        let c_data5 = c_cell.data_5 || 0;
        let c_data6 = c_cell.data_6 || 0;
        let c_data7 = c_cell.data_7 || 0;
        let c_data8 = c_cell.data_8 || 0;

        let c_new_p_all = c_data4.to_perate(c_data2);
        let c_repeat_p_all = c_data5.to_perate(c_data2);
        let c_ave_count = c_data2.to_Perate(c_data3);
        let c_jihi_rate = c_data1.to_perate(c_data0);
        let c_jihi_cup = c_data1.to_devide(c_data2);
        let c_hup = c_data1.to_devide(c_data6);
        let c_new_repeat = c_data8.to_perate(c_data4);
        let c_total_repeat = c_data5.to_perate(c_data7);


        let c_at0 = c_data0.toLocaleString();
        let c_at1 = c_data3.toLocaleString();
        let c_at2 = c_data2.toLocaleString();
        let c_at3 = c_repeat_p_all;
        let c_at4 = c_new_p_all;
        let c_at5 = c_ave_count;
        let c_at6 = c_jihi_rate.toLocaleString();
        let c_at7 = c_jihi_cup.toLocaleString();
        let c_at8 = c_hup.toLocaleString();
        let c_at9 = c_data1.toLocaleString();
        let c_at10 = c_new_repeat;
        let c_at11 = c_total_repeat;

        let rate0 = data0.to_rate(c_data0).rate_str();
        let rate1 = data3.to_rate(c_data3).rate_str();
        let rate2 = data2.to_rate(c_data2).rate_str();
        let rate3 = repeat_p_all.to_rate(c_repeat_p_all).rate_str();
        let rate4 = new_p_all.to_rate(c_new_p_all).rate_str();
        let rate5 = ave_count.to_rate(c_ave_count).rate_str();
        let rate6 = jihi_rate.to_rate(c_jihi_rate).rate_str();
        let rate7 = jihi_cup.to_rate(c_jihi_cup).rate_str();
        let rate8 = hup.to_rate(c_hup).rate_str();
        let rate9 = data1.to_rate(c_data1).rate_str();
        let rate10 = new_repeat.to_rate(c_new_repeat).rate_str();
        let rate11 = total_repeat.to_rate(c_total_repeat).rate_str();

        ap +=
        `
        <tr>
          <th>
            <a href="/achieve_analytics?st=${st+1}&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
              ${user_name==MSD_smn?`${stna[st+1]}${cell.obj_id}`: cell.obj_name}
            </a>
          </th>
          <td>
            <div class="amount">¥${at0}</div>
            <div class="c_amount">¥${c_at0}</div>
            <div class="rate">${rate0}</div>
          </td>
          <td>
            <div class="amount">${at1}</div>
            <div class="c_amount">${c_at1}</div>
            <div class="rate">${rate1}</div>
          </td>
          <td>
            <div class="amount">${at2}</div>
            <div class="c_amount">${c_at2}</div>
            <div class="rate">${rate2}</div>
          </td>
          <td>
            <div class="amount">${at3}%</div>
            <div class="c_amount">${c_at3}%</div>
            <div class="rate">${rate3}</div>
          </td>
          <td>
            <div class="amount">${at4}%</div>
            <div class="c_amount">${c_at4}%</div>
            <div class="rate">${rate4}</div>
          </td>
          <td>
            <div class="amount">${at5}</div>
            <div class="c_amount">${c_at5}</div>
            <div class="rate">${rate5}</div>
          </td>
          <td>
            <div class="amount">${at6}%</div>
            <div class="c_amount">${c_at6}%</div>
            <div class="rate">${rate6}</div>
          </td>
          <td>
            <div class="amount">¥${at7}</div>
            <div class="c_amount">¥${c_at7}</div>
            <div class="rate">${rate7}</div>
          </td>
          <td>
            <div class="amount">¥${at8}</div>
            <div class="c_amount">¥${c_at8}</div>
            <div class="rate">${rate8}</div>
          </td>
          <td>
            <div class="amount">¥${at9}</div>
            <div class="c_amount">¥${c_at9}</div>
            <div class="rate">${rate9}</div>
          </td>
          <td>
            <div class="amount">${at10}%</div>
            <div class="c_amount">${c_at10}%</div>
            <div class="rate">${rate10}</div>
          </td>
          <td>
            <div class="amount">${at11}%</div>
            <div class="c_amount">${c_at11}%</div>
            <div class="rate">${rate11}</div>
          </td>
        </tr>
        `;
      }
    });

    $('#table_list').html(
      `
      <table id="list_table">
        <thead>
          <tr class="group">
            <th></th>
            <th colspan="5">ボリューム(Quantity)</th>
            <th colspan="7">効果(Quality)</th>
          </tr>
          <tr>
            <th>${tia[st]}</th>
            <th>自費売上</th>
            <th>純患数</th>
            <th>来院数</th>
            <th>既存顧客割合</th>
            <th>新規顧客割合</th>
            <th>平均来院回数</th>
            <th>自費割合</th>
            <th>自費客単</th>
            <th>自費時単</th>
            <th>自費LTV</th>
            <th>新規顧客再来率</th>
            <th>リピート率</th>
          </tr>
        </thead>
        <tbody>${ap}</tbody>
      </table>
      `
    );

    let table = $('#list_table').DataTable({
      columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10,11,12]}],
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
  desc_content();
  $(document).off('change','#segment_select').on('change','#segment_select',function() {
    desc_content();
  });
}
var query_function = async () => {
  let form = document.forms['query_form'];
  let pt = Number(form.elements['pt_'].value);
  let ps = form.elements['pi_s'].value;
  let pe = form.elements['pi_e'].value;
  let cpt = form.elements['cpt'].checked;
  let cps = form.elements['cpi_s'].value;
  let cpe = form.elements['cpi_e'].value;

  (() => {
    let cpt_s = cpt ? `${cps.str_date(`.`)} - ${cpe.str_date(`.`)}` : `比較しない`;
    $('#setting_ios').prop('checked',false);
    $('#setting_indi').html(
      `
      <div class="cell inline"><i class="fas fa-cogs"></i></div>
      <div class="cell inline">${ptna[pt]}</div>
      <div class="cell inline">${ps.str_date(`.`)} - ${pe.str_date(`.`)}</div>
      <div class="cell inline"><i class="fas fa-balance-scale-right"></i></div>
      <div class="cell inline">${cpt_s}</div>
      <div class="cell cell_indi inline"><i class="fas fa-caret-down"></i></div>
      `
    );
  })();

  const sender_data = {ps:ps,pe:pe,cpt:cpt,cps:cps,cpe:cpe}

  let result = await ajax_api_function("remarkable_points",sender_data);
  if (result.dataExists) {
    sender_objs = result.data;
    desc_function(result.data);
  } else {
    alert(`データ通信エラー:${result.reason}`);
  }
}

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);

  $(document).ready(async function(){
    (() => {
      $('#left_input_0').prop('checked',true);
      $('.left_bar_base a:eq(2) .cell').addClass('selected');
      jQuery(function($) {
        $.extend( $.fn.dataTable.defaults, {
          language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
          }
        });
      });
    })();

    const desc_init = async () => {
      await psln_setter(0);
      await psl_setter(0,"pi");
      await query_function();
    }
    desc_init();
  });
}
