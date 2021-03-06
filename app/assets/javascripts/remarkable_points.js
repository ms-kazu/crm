var user_name = getDOM('user_name').value;

var desc_function = (sender) => {
  const desc_content = () => {
    let cpt = $('#cpt').prop('checked');
    let pt = $('input[name="pt_"]:checked').prop('value');
    let ps = getDOM('pi_s').value;
    let pe = getDOM('pi_e').value;
    let st = Number($('#segment_select option:selected').prop('value'));
    let objs = sender.data[st];
    let c_objs = sender.data_c[st];

    let tia = [
      `<i class="fas fa-map-marked-alt"></i>`,
      `<i class="fas fa-clinic-medical"></i>`,
      `<i class="fas fa-user-tie"></i>`
    ];

    let ap = ``;
    objs.forEach((cell) => {
      let data0 = cell.data_1 | 0;
      let data1 = cell.data_0 | 0;
      let data2 = cell.data_2 | 0;
      let data3 = cell.data_3 | 0;
      let data4 = cell.data_4 | 0;
      let data5 = cell.data_5 | 0;
      let data6 = cell.data_6 | 0;
      let data7 = cell.data_7 | 0;

      let new_p_all = data4.to_perate(data2);
      let repeat_p_all = data5.to_perate(data2);
      let ave_count = data2.to_Perate(data3);
      let jihi_rate = data0.to_perate(data1);
      let jihi_cup = data0.to_devide(data2);
      let jihi_ltv = data0.to_devide(data3);
      let mado_cup = data1.to_devide(data2);
      let mado_ltv = data1.to_devide(data3);
      let new_repeat = data7.to_perate(data4);
      let total_repeat = data5.to_perate(data6);


      let at1 = data0.toLocaleString();
      let at2 = jihi_cup.toLocaleString();
      let at3 = jihi_ltv.toLocaleString();
      let at4 = jihi_rate.toLocaleString();
      let at5 = data1.toLocaleString();
      let at6 = mado_cup.toLocaleString();
      let at7 = mado_ltv.toLocaleString();
      let at8 = data3.toLocaleString();
      let at9 = data2.toLocaleString();
      let at10 = repeat_p_all;
      let at11 = new_p_all;
      let at12 = ave_count;
      let at13 = new_repeat;
      let at14 = total_repeat;

      if (!cpt) {
        ap +=
        `
        <tr>
          <th>
            <a href="/achieve_analytics?st=${st+1}&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
              ${user_name==MSD_smn?`${stna[st+1]}${cell.obj_id}`: cell.obj_name}
            </a>
          </th>
          <td>??${at1}</td>
          <td>??${at2}</td>
          <td>??${at3}</td>
          <td>${at4}%</td>
          <td>??${at5}</td>
          <td>??${at6}</td>
          <td>??${at7}</td>
          <td>${at8}</td>
          <td>${at9}</td>
          <td>${at10}%</td>
          <td>${at11}%</td>
          <td>${at12}</td>
          <td>${at13}%</td>
          <td>${at14}%</td>
        </tr>
        `;
      } else {
        let c_cells = c_objs.filter(({obj_id}) => obj_id == cell.obj_id);
        let c_cell = c_cells.length == 1 ? c_cells[0] : {};

        let c_data0 = c_cell.data_1 || 0;
        let c_data1 = c_cell.data_0 || 0;
        let c_data2 = c_cell.data_2 || 0;
        let c_data3 = c_cell.data_3 || 0;
        let c_data4 = c_cell.data_4 || 0;
        let c_data5 = c_cell.data_5 || 0;
        let c_data6 = c_cell.data_6 || 0;
        let c_data7 = c_cell.data_7 || 0;

        let c_new_p_all = c_data4.to_perate(c_data2);
        let c_repeat_p_all = c_data5.to_perate(c_data2);
        let c_ave_count = c_data2.to_Perate(c_data3);
        let c_jihi_rate = c_data0.to_perate(c_data1);
        let c_jihi_cup = c_data0.to_devide(c_data2);
        let c_jihi_ltv = c_data0.to_devide(c_data3);
        let c_mado_cup = c_data1.to_devide(c_data2);
        let c_mado_ltv = c_data1.to_devide(c_data3);
        let c_new_repeat = c_data7.to_perate(c_data4);
        let c_total_repeat = c_data5.to_perate(c_data6);

        let c_at1 = c_data0.toLocaleString();
        let c_at2 = c_jihi_cup.toLocaleString();
        let c_at3 = c_jihi_ltv.toLocaleString();
        let c_at4 = c_jihi_rate.toLocaleString();
        let c_at5 = c_data1.toLocaleString();
        let c_at6 = c_mado_cup.toLocaleString();
        let c_at7 = c_mado_ltv.toLocaleString();
        let c_at8 = c_data3.toLocaleString();
        let c_at9 = c_data2.toLocaleString();
        let c_at10 = c_repeat_p_all;
        let c_at11 = c_new_p_all;
        let c_at12 = c_ave_count;
        let c_at13 = c_new_repeat;
        let c_at14 = c_total_repeat;


        let rate1 = data0.to_rate(c_data0).rate_str();
        let rate2 = jihi_cup.to_rate(c_jihi_cup).rate_str();
        let rate3 = jihi_ltv.to_rate(c_jihi_ltv).rate_str();
        let rate4 = jihi_rate.to_rate(c_jihi_rate).rate_str();
        let rate5 = data1.to_rate(c_data1).rate_str();
        let rate6 = mado_cup.to_rate(c_mado_cup).rate_str();
        let rate7 = mado_ltv.to_rate(c_mado_ltv).rate_str();
        let rate8 = data3.to_rate(c_data3).rate_str();
        let rate9 = data2.to_rate(c_data2).rate_str();
        let rate10 = repeat_p_all.to_rate(c_repeat_p_all).rate_str();
        let rate11 = new_p_all.to_rate(c_new_p_all).rate_str();
        let rate12 = ave_count.to_rate(c_ave_count).rate_str();
        let rate13 = new_repeat.to_rate(c_new_repeat).rate_str();
        let rate14 = total_repeat.to_rate(c_total_repeat).rate_str();

        let app = ``;
        for (let i = 1;i <= 14;i++) {
          let at,c_at,rate = eval(`rate${i}`);
          if (i == 1 || i == 2 || i == 3 || i == 5 || i == 6 || i == 7) {
            at = `??${eval(`at${i}`)}`;
            c_at = `??${eval(`c_at${i}`)}`;
          } else if (i == 4 || i == 10 || i == 11 || i == 13 || i == 14) {
            at = `${eval(`at${i}`)}%`;
            c_at = `${eval(`c_at${i}`)}%`;
          } else {
            at = `${eval(`at${i}`)}`;
            c_at = `${eval(`c_at${i}`)}`;
          }
          app +=
          `
          <td>
            <div class="amount">${at}</div>
            <div class="c_amount">${c_at}</div>
            <div class="rate">${rate}</div>
          </td>
          `;
        }

        ap +=
        `
        <tr>
          <th>
            <a href="/achieve_analytics?st=${st+1}&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
              ${user_name==MSD_smn?`${stna[st+1]}${cell.obj_id}`: cell.obj_name}
            </a>
          </th>
          ${app}
        </tr>
        `
      }
    });

    $('#table_list').html(
      `
      <table id="list_table">
        <thead>
          <tr class="group">
            <th></th>
            <th colspan="4">????????????</th>
            <th colspan="3">????????????</th>
            <th colspan="4">???????????????</th>
            <th colspan="3">??????</th>
          </tr>
          <tr>
            <th>${tia[st]}</th>
            <th>??????</th>
            <th>?????????</th>
            <th>LTV</th>
            <th>??????/????????????</th>
            <th>??????</th>
            <th>?????????</th>
            <th>LTV</th>

            <th>?????????</th>
            <th>?????????</th>
            <th>????????????</th>
            <th>????????????</th>
            <th>???????????????</th>
            <th>?????????????????????</th>
            <th>???????????????</th>
          </tr>
        </thead>
        <tbody>${ap}</tbody>
      </table>
      `
    );

    let table = $('#list_table').DataTable({
      columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10,11,12,13]}],
      lengthMenu: [10,20,30,40,50],
      displayLength:50,
      lengthChange: true,
      searching: true,
      ordering: true,
      info: true,
      paging: true,
      order:[[1,"desc"]]
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
    let cpt_s = cpt ? `${cps.str_date(`.`)} - ${cpe.str_date(`.`)}` : `???????????????`;
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
    desc_function(result.data);
  } else {
    alert(`????????????????????????:${result.reason}`);
  }
}

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);

  $(document).ready(async function(){
    (() => {
      $('.left_bar_base a:eq(2) .cell').addClass('selected');
      jQuery(function($) {
        $.extend( $.fn.dataTable.defaults, {
          language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
          }
        });
      });

      $('#page_ttl_base').html(`<div class="icn inline"><i class="fas fa-lightbulb-on"></i></div>????????????`);
    })();

    const desc_init = async () => {
      await psln_setter(0);
      await psl_setter(0,"pi");
      await query_function();
    }
    desc_init();
  });
}
