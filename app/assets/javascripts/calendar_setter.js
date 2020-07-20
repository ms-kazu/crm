var user_name = getDOM('user_name').value;

var sm_day_length = 0;
var sm_segment_type = 1;
var sm_segment_id = 0;
var sm_segment_month = `2020-01`;

var shift_name_arr = ["未設定","休日","半日営業","営業日"];
var all_day_select = () => {
  let value = document.forms['ads_form'].elements[`status`].value;
  $(`.cell_day .w_a`).html(shift_name_arr[value]);
  $(`.cell_day .w_a`).attr('data-set',value);
}
var week_day_select = () => {
  let value = document.forms['wds_form'].elements['status'].value;
  $(`.cell_day_weekday .w_a`).html(shift_name_arr[value]);
  $(`.cell_day_weekday .w_a`).attr('data-set',value);
}
var holi_day_select = () => {
  let value = document.forms['hds_form'].elements['status'].value;
  $(`.cell_day_holiday .w_a`).html(shift_name_arr[value]);
  $(`.cell_day_holiday .w_a`).attr('data-set',value);
}
var week_select = () => {
  let week = document.forms['ws_form'].elements['week'].value;
  let value = document.forms['ws_form'].elements['status'].value;
  $(`.cell_day_week_${week} .w_a`).html(shift_name_arr[value]);
  $(`.cell_day_week_${week} .w_a`).attr('data-set',value);
}
var perticular_day_select = () => {
  let day = document.forms['pds_form'].elements['day'].value;
  let value = document.forms['pds_form'].elements['status'].value;
  $(`.cell_day_day_${day} .w_a`).html(shift_name_arr[value]);
  $(`.cell_day_day_${day} .w_a`).attr('data-set',value);
}

$(document).off('click','#setting_modal_quit').on('click','#setting_modal_quit',function() {
  $('.setting_modal').hide();
});
$(document).off('click','#setting_modal_submit').on('click','#setting_modal_submit',async function() {
  let seg_type = sm_segment_type;
  let seg_id = sm_segment_id;
  let seg_month = sm_segment_month;

  let sql = `insert into mt_opens(sdate,seg_id,status) values`;
  for (let i = 1;i <= sm_day_length;i++) {
    let w_a = $(`.cell_day_day_${i} .w_a`).attr('data-set');
    if (!w_a || w_a == 0) {
      alert('全ての日に営業日設定をしてください。');
      return;
    }
    let comma = i != sm_day_length ? `,`: ``;
    sql += `("${seg_month}-${i.str_num()}",${seg_id},${w_a})${comma}`;
  }

  const sender_data = {
    si:seg_id,
    sm:seg_month,
    sql:sql
  }
  /*

  CREATE TABLE `mt_opens` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `sdate` date DEFAULT NULL,
    `seg_id` int(6) DEFAULT NULL,
    `status` smallint(6) DEFAULT NULL,
    `updated_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
  )

  */

  let result = await ajax_api_function("create_open",sender_data);
  if (result.dataExists) {
    window.location.reload();
  } else {
    alert(`データ通信エラー:${result.reason}`);
  }
});

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);
  $(document).ready(async function(){
    (() => {
      $('.left_bar_base a:eq(0) label').addClass('selected');
    })();

    const desc_objs_list = async () => {
      let today = new Date();
      let this_year = today.getFullYear();
      let this_month = today.getMonth() + 1;

      let ps = new Date(this_year,this_month - 6,1).dD();
      let pe = new Date(this_year,this_month + 5,1).dD();
      let pa = period_map(ps,pe,2);

      const sender_data = {ps:ps,pe:pe}
      let result = await ajax_api_function("read_open_objs",sender_data);
      if (result.dataExists) {
        desc_month_list(pa,result);
      } else {
        alert('データ通信エラー');
      }
    }
    const desc_month_list = (pa,sender) => {
      let cl_objs = sender.data_cl;
      let mscl_objs = sender.data_mscl;
      let ap = ``;
      for (let i = pa.length - 1;i >= 0;i--) {
        let label = pa[i];
        let pl = label.str_date(`.`);
        let result = mscl_objs.filter(({month}) => month == label);
        let day = result.sum_val(`status`);
        ap +=
        `
        <tr>
          <th class="open_selector month_tr_os" data-label="${label}"><div></div></th>
          <td>${pl}</td>
          <td>${day.toLocaleString()}日</td>
        </tr>
        `;
      }
      $('#month_tbody').html(ap);
      let monthTable = $('#mission_table').DataTable({
        lengthChange: false,
        searching: false,
        ordering: false,
        info: false,
        paging: false
      });

      const desc_clinic_list = (row,pl) => {
        let result = mscl_objs.filter(({month}) => month == pl);
        let list_ap = ``;
        cl_objs.forEach((cell) => {
          let mission = result.filter(({obj_id}) => obj_id == cell.id);
          let day = mission.sum_val(`status`);

          list_ap +=
          `
          <tr>
            <th class="open_selector"></th>
            <td><button class="cl_sl_btn" id="cl_sl_${pl}_${cell.id}" data-name="${cell.name}">${user_name==MSD_smn?`店舗${cell.id}`:cell.name}</button></td>
            <td>${day.toLocaleString()}日</td>
          </tr>
          `;
        });
        row.child(
          `
          <table class="clinic_table" id="clinic_table_${pl}">
            <thead>
              <tr>
                <th><i class="fas fa-clinic-medical"></i></th>
                <th>店舗名</th>
                <th>営業日合計</th>
              </tr>
            </thead>
            <tbody>
              ${list_ap}
            </tbody>
          </table>
          `
        ).show();
        let clinicTable = $(`#clinic_table_${pl}`).DataTable({
          lengthChange: false,
          searching: false,
          ordering: false,
          info: false,
          paging: false
        });

        $(document).off('click','.cl_sl_btn').on('click','.cl_sl_btn',function() {
          let id = $(this).prop('id');
          let pl = id.split('_')[2];
          let sid = id.split('_')[3];
          let name = $(this).attr('data-name');
          desc_calendar(pl,1,Number(sid),name);
        });
      }
      $(document).off('click','.month_tr_os').on('click','.month_tr_os',function() {
        let tr = $(this).closest('tr');
        let row = monthTable.row(tr);
        let label = $(this).attr('data-label');
        if ($(this).hasClass('open')) {
          row.child.remove();
          $(this).removeClass('open');
        } else {
          $(this).addClass('open');
          desc_clinic_list(row,label);
        }
      });
    }
    const desc_calendar = async (pl,st,oid,name) => {
      const sender_data = {
        month:pl,
        st:st,
        oid:oid
      }

      let result = await ajax_api_function("read_open_calendar",sender_data);
      if (result.dataExists) {
        const desc_calendar = () => {
          let ps = new Date(`${pl}-01`);
          let pe = new Date(ps.getFullYear(),ps.getMonth() + 1,0);
          let pa = period_map(ps,pe,0);
          let objs = result.data;

          $('#calendar_title').html(`${pl.str_date(`.`)} ${user_name==MSD_smn?`店舗${oid}`:name} 営業日`);
          sm_day_length = pa.length;
          sm_segment_type = st;
          sm_segment_id = oid;
          sm_segment_month = pl;

          let select_day = ``;
          let select_week = ``;
          let first_week = new Date(pa[0]).getDay();
          let month = new Date(pa[0]).getMonth() + 1;
          let ap = ``;
          for (let i = 0;i <= 6;i++) {
            select_week += `<option value="${i}">${wna[i]}曜日</option>`;
            ap += `<div class="cell cell_indi">${wna[i]}</div>`;
          }
          for (let i = 0;i < first_week;i++) {ap += `<div class="cell cell_empty"></div>`;}
          for (let i = 1;i <= pa.length;i++) {
            select_day += `<option value="${i}">${month}月${i}日</option>`;

            let week_type = first_week == 0 || first_week == 6 ? `cell_day_holiday` : `cell_day_weekday`;
            let result = objs.filter(({date}) => date == `${pl}-${i.str_num()}`);
            let status = result.sum_val(`status`);
            ap +=
            `
            <div class="cell cell_day cell_day_day_${i} ${week_type} cell_day_week_${first_week}">
              <div class="day">${i}</div>
              <div class="box box_shift">
                <div class="amount w_a" data-set="${status}">${shift_name_arr[status]}</div>
              </div>
            </div>
            `;
            if (first_week == 6) first_week = 0;
            else first_week += 1;
          }
          $('#calendar_list').html(ap);
          $('#way5_select_week').html(select_week);
          $('#way6_select_day').html(select_day);
          $('.setting_modal').show();
        }
        desc_calendar();
      } else {
        alert(`データ通信エラー:${result.reason}`);
      }
    }
    await desc_objs_list();
  });
}
