var user_name = getDOM('user_name').value;

var sm_day_length = 0;
var sm_segment_type = 1;
var sm_segment_id = 0;
var sm_segment_month = `2020-01`;
var return_ipath = (sender) => {
  if (sender == 0) return `w_a`;
  else return `c_a`;
}
var month_mission_input = () => {
  let amount = Math.round(Number(document.forms['mmi_form'].elements['amount'].value) / sm_day_length).toLocaleString();
  let mci_type = $('input[name="mci_type"]:checked').prop('id').split('_')[2];
  $(`.cell_day .${return_ipath(mci_type)}`).html(amount);
}
var day_mission_input = () => {
  let amount = Number(document.forms['dmi_form'].elements['amount'].value).toLocaleString();
  let mci_type = $('input[name="mci_type"]:checked').prop('id').split('_')[2];
  $(`.cell_day .${return_ipath(mci_type)}`).html(amount);
}
var weekday_mission_input = () => {
  let amount = Number(document.forms['wmi_form'].elements['amount'].value).toLocaleString();
  let mci_type = $('input[name="mci_type"]:checked').prop('id').split('_')[2];
  $(`.cell_day_weekday .${return_ipath(mci_type)}`).html(amount);
}
var holiday_mission_input = () => {
  let amount = Number(document.forms['hmi_form'].elements['amount'].value).toLocaleString();
  let mci_type = $('input[name="mci_type"]:checked').prop('id').split('_')[2];
  $(`.cell_day_holiday .${return_ipath(mci_type)}`).html(amount);
}
var select_week_mission_input = () => {
  let week = document.forms['swmi_form'].elements['week'].value;
  let amount = Number(document.forms['swmi_form'].elements['amount'].value).toLocaleString();
  let mci_type = $('input[name="mci_type"]:checked').prop('id').split('_')[2];
  $(`.cell_day_week_${week} .${return_ipath(mci_type)}`).html(amount);
}
var select_day_mission_input = () => {
  let day = document.forms['sdmi_form'].elements['day'].value;
  let amount = Number(document.forms['sdmi_form'].elements['amount'].value).toLocaleString();
  let mci_type = $('input[name="mci_type"]:checked').prop('id').split('_')[2];
  $(`.cell_day_day_${day} .${return_ipath(mci_type)}`).html(amount);
}

$(document).off('click','#setting_modal_quit').on('click','#setting_modal_quit',function() {
  $('.setting_modal').hide();
});
$(document).off('click','#setting_modal_submit').on('click','#setting_modal_submit',async function() {
  let seg_type = sm_segment_type;
  let seg_id = sm_segment_id;
  let seg_month = sm_segment_month;

  let sql = `insert into mt_targets(sdate,seg_type,seg_id,window_,count_) values`;
  for (let i = 1;i <= sm_day_length;i++) {
    let w_a = Number($(`.cell_day_day_${i} .w_a`).html().replace(',','')) || 0;
    let c_a = Number($(`.cell_day_day_${i} .c_a`).html().replace(',','')) || 0;
    let comma = i != sm_day_length ? `,`: ``;
    sql += `("${seg_month}-${i.str_num()}",${seg_type},${seg_id},${w_a},${c_a})${comma}`;
  }

  const sender_data = {
    st:seg_type,
    si:seg_id,
    sm:seg_month,
    sql:sql
  }

  let result = await ajax_api_function("create_mission",sender_data);
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
      let result = await ajax_api_function("read_mission_objs",sender_data);
      if (result.dataExists) {
        desc_month_list(pa,result);
      } else {
        alert('データ通信エラー');
      }
    }
    const desc_month_list = (pa,sender) => {
      let cl_objs = sender.data_cl;
      let sf_objs = sender.data_sf;
      let mscl_objs = sender.data_mscl;
      let mssf_objs = sender.data_mssf;

      let ap = ``;
      for (let i = pa.length - 1;i >= 0;i--) {
        let label = pa[i];
        let pl = label.str_date(`.`);
        let result = mscl_objs.filter(({month}) => month == label);
        let window_amount = result.sum_val(`window_amount`);
        let count_amount = result.sum_val(`count_amount`);
        ap +=
        `
        <tr>
          <th class="open_selector month_tr_os" data-label="${label}"><div></div></th>
          <td>${pl}</td>
          <td>¥${window_amount.toLocaleString()}</td>
          <td>${count_amount.toLocaleString()}人</td>
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
          let window_amount = mission.sum_val(`window_amount`);
          let count_amount = mission.sum_val(`count_amount`);

          list_ap +=
          `
          <tr>
            <th class="open_selector clinic_tr_os" data-pl="${pl}" data-cid="${cell.id}"><div></div></th>
            <td><button class="cl_sl_btn" id="cl_sl_${pl}_${cell.id}" data-name="${cell.name}">${user_name==MSD_smn?`店舗${cell.id}`:cell.name}</button></td>
            <td>¥${window_amount.toLocaleString()}</td>
            <td>${count_amount.toLocaleString()}人</td>
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
                <th>窓口売上目標</th>
                <th>来院数目標</th>
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

        const desc_staff_list = (row,pl,cid) => {
          console.log(mssf_objs);
          console.log(sf_objs);
          let result = mssf_objs.filter(({obj_cl_id}) => obj_cl_id == cid);
          let rl_sf_objs = sf_objs.filter(({clinic_id}) => clinic_id == cid);
          let list_ap = ``;
          rl_sf_objs.forEach((cell) => {
            let mission = result.filter((cel) => cel.obj_id == cell.id && cel.month == pl);
            let window_amount = mission.sum_val(`window_amount`);
            let count_amount = mission.sum_val(`count_amount`);

            list_ap +=
            `
            <tr>
              <th class="open_selector"></th>
              <td><button class="sf_sl_btn" id="sf_sl_${pl}_${cell.id}" data-name="${cell.name}">${user_name==MSD_smn?`スタッフ${cell.id}`:cell.name}</button></td>
              <td>¥${window_amount.toLocaleString()}</td>
              <td>${count_amount.toLocaleString()}人</td>
            </tr>
            `;
          });
          row.child(
            `
            <table class="staff_table">
              <thead>
                <tr>
                  <th><i class="fas fa-user-tie"></i></th>
                  <th>担当者名</th>
                  <th>窓口売上目標</th>
                  <th>来院数目標</th>
                </tr>
              </thead>
              <tbody>
                ${list_ap}
              </tbody>
            </table>
            `
          ).show();

          $(document).off('click','.sf_sl_btn').on('click','.sf_sl_btn',function() {
            let id = $(this).prop('id');
            let pl = id.split('_')[2];
            let sid = id.split('_')[3];
            let name = $(this).attr('data-name');
            desc_calendar(pl,2,Number(sid),name);
          });
        }
        $(document).off('click','.clinic_tr_os').on('click','.clinic_tr_os',function() {
          let tr = $(this).closest('tr');
          let row = clinicTable.row(tr);
          let pl = $(this).attr('data-pl');
          let cid = $(this).attr('data-cid');
          if ($(this).hasClass('open')) {
            row.child.remove();
            $(this).removeClass('open');
          } else {
            $(this).addClass('open');
            desc_staff_list(row,pl,cid);
          }
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

      let result = await ajax_api_function("read_mission_calendar",sender_data);
      if (result.dataExists) {
        const desc_calendar = () => {
          let ps = new Date(`${pl}-01`);
          let pe = new Date(ps.getFullYear(),ps.getMonth() + 1,0);
          let pa = period_map(ps,pe,0);
          let objs = result.data;

          $('#calendar_title').html(`${pl.str_date(`.`)} ${user_name=="msds"?`${stna[st]}${oid}`:name} 目標`);
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
            let w_a = result.sum_val(`window_amount`);
            let c_a = result.sum_val(`count_amount`);

            ap +=
            `
            <div class="cell cell_day cell_day_day_${i} ${week_type} cell_day_week_${first_week}">
              <div class="day">${i}</div>
              <div class="box">
                <div class="indi">窓売</div>
                <div class="amount w_a">${w_a.toLocaleString()}</div>
              </div>
              <div class="box">
                <div class="indi">来院数</div>
                <div class="amount c_a">${c_a.toLocaleString()}</div>
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
