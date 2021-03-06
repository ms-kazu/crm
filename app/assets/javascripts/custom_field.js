var user_name = getDOM('user_name').value;
var clt_id = getDOM('clt_id').value;

var desc_function = (data) => {
  let pt = $('input[name="pt_"]:checked').prop('id').split('_')[1];
  let ps = getDOM(`pi_s`).value;
  let pe = getDOM(`pi_e`).value;
  let pa = period_map(ps,pe,pt);

  const desc_content_leveling = () => {
    $('#content_base').html(
      `
      <div class="section">
        <div class="cells_box">
          <div class="cell cell_1x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">店舗</div>
              <div class="content">
                <div class="base">
                  <div class="btn_base" style="text-align:center;"><button id="rstbtn0"><i class="fas fa-file-excel"></i> excel.xlsx</button></div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">担当者</div>
              <div class="content">
                <div class="base">
                  <div class="btn_base" style="text-align:center;"><button id="rstbtn1"><i class="fas fa-file-excel"></i> excel.xlsx</button></div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">来店動機</div>
              <div class="content">
                <div class="base">
                  <div class="btn_base" style="text-align:center;"><button id="rstbtn2"><i class="fas fa-file-excel"></i> excel.xlsx</button></div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">キーワード</div>
              <div class="content">
                <div class="base">
                  <div class="btn_base" style="text-align:center;"><button id="rstbtn3"><i class="fas fa-file-excel"></i> excel.xlsx</button></div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">自費メニュー</div>
              <div class="content">
                <div class="base">
                  <div class="btn_base" style="text-align:center;"><button id="rstbtn4"><i class="fas fa-file-excel"></i> excel.xlsx</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="table_base" style="display:none;">
          <div class="table_table_base" id="clinic_table_base">
            <table id="table_clinic" data-sheet-name="店舗別サマリ">
            </table>
            <div id="table_clinic_base">
            </div>
          </div>
          <div class="table_table_base" id="staff_table_base">
            <table id="table_staff" data-sheet-name="担当者別サマリ">
            </table>
            <div id="table_staff_base">
            </div>
          </div>
          <div class="table_table_base" id="vr_table_base">
            <table id="table_vr" data-sheet-name="来店動機別サマリ">
            </table>
          </div>
          <div class="table_table_base" id="key_table_base">
            <table id="table_key" data-sheet-name="キーワードメニュー別サマリ">
            </table>
          </div>
          <div class="table_table_base" id="jihi_table_base">
            <table id="table_jihi" data-sheet-name="自費メニュー別サマリ">
            </table>
          </div>
        </div>
      </div>
      `
    );
  }
  desc_content_leveling();

  $(document).off('click','#rstbtn0').on('click','#rstbtn0',function() {
    let objs = data.data.data0;
    let datas = data.data.data4;
    let cates = data.data.data7;
    let repeats = data.data.data6;
    (() => {
      let ap = ``;
      let day_pa = period_map(ps,pe,0);
	    console.log(datas);

	    console.log(objs);
      objs.forEach((cell) => {
        let result = datas.filter(({obj_id}) => obj_id == cell.obj_id);

        let data_0 = result.sum_val(`data_0`);
        let data_1 = result.sum_val(`data_1`);
        let data_2 = result.sum_val(`data_2`);
        let data_3 = result.sum_val(`data_3`);
        let data_4 = result.sum_val(`data_4`);
        let data_5 = result.sum_val(`data_5`);
        let data_6 = result.sum_val(`data_6`);
        let data_7 = result.sum_val(`data_7`);
        let data_8 = result.sum_val(`data_8`);
        let data_9 = result.sum_val(`data_9`);
        let data_10 = result.sum_val(`data_10`);
	let data_11 = result.sum_val(`data_11`);      

	let data_12 = result.sum_val(`data_12`);
	let data_13 = result.sum_val(`data_13`);
	let data_14 = result.sum_val(`data_14`);
	let data_15 = result.sum_val(`data_15`);

        let lity_0 = data_3.to_devide(data_5);
        let lity_1 = data_3.to_devide(data_9);
        let lity_2 = data_5.to_Perate(data_6);
        let lity_3 = data_7.to_perate(data_5);
        let lity_4 = (data_5 - data_7).to_perate(data_5);

        let cate = cates.filter(({obj_id}) => obj_id == cell.obj_id);

        let cate_0 = cate.filter(({type}) => type == 11);
        let cate_1 = cate.filter(({type}) => type == 12);
        let cate_2 = cate.filter(({type}) => type == 13);
        let cate_3 = cate.filter(({type}) => type == 14);
        let cate_4 = cate.filter(({type}) => type == 15);
        let cate_5 = cate.filter(({type}) => type == 16);

        let cate_s_0 = cate_0.sum_val(`data_1`);
        let cate_f_0 = cate_0.sum_val(`data_2`);
        let cate_c_0 = cate_0.sum_val(`data_4`);
        let cate_a_0 = cate_c_0.to_Perate(day_pa.length);
	let cate_pure_0 = cate_0.sum_val(`pure_customer`);
	let cate_newer_0 = cate_0.sum_val(`newer`);
	let cate_cured_0 = cate_0.sum_val(`cured`);

        let cate_s_1 = cate_1.sum_val(`data_1`);
        let cate_f_1 = cate_1.sum_val(`data_2`);
        let cate_c_1 = cate_1.sum_val(`data_4`);
        let cate_a_1 = cate_c_1.to_Perate(day_pa.length);
	let cate_pure_1 = cate_1.sum_val(`pure_customer`);
        let cate_newer_1 = cate_1.sum_val(`newer`);
        let cate_cured_1 = cate_1.sum_val(`cured`);

        let cate_s_2 = cate_2.sum_val(`data_1`);
        let cate_f_2 = cate_2.sum_val(`data_2`);
        let cate_c_2 = cate_2.sum_val(`data_4`);
        let cate_a_2 = cate_c_2.to_Perate(day_pa.length);
	let cate_pure_2 = cate_2.sum_val(`pure_customer`);
        let cate_newer_2 = cate_2.sum_val(`newer`);
        let cate_cured_2 = cate_2.sum_val(`cured`);

        let cate_s_3 = cate_3.sum_val(`data_1`);
        let cate_f_3 = cate_3.sum_val(`data_2`);
        let cate_c_3 = cate_3.sum_val(`data_4`);
        let cate_a_3 = cate_c_3.to_Perate(day_pa.length);
        let cate_pure_3 = cate_3.sum_val(`pure_customer`);
        let cate_newer_3 = cate_3.sum_val(`newer`);
        let cate_cured_3 = cate_3.sum_val(`cured`);

        let cate_s_4 = cate_4.sum_val(`data_1`);
        let cate_f_4 = cate_4.sum_val(`data_2`);
        let cate_c_4 = cate_4.sum_val(`data_4`);
        let cate_a_4 = cate_c_4.to_Perate(day_pa.length);
        let cate_pure_4 = cate_4.sum_val(`pure_customer`);
        let cate_newer_4 = cate_4.sum_val(`newer`);
        let cate_cured_4 = cate_4.sum_val(`cured`);

        let cate_s_5 = cate_5.sum_val(`data_1`);
        let cate_f_5 = cate_5.sum_val(`data_2`);
        let cate_c_5 = cate_5.sum_val(`data_4`);
        let cate_a_5 = cate_c_5.to_Perate(day_pa.length);
        let cate_pure_5 = cate_5.sum_val(`pure_customer`);
        let cate_newer_5 = cate_5.sum_val(`newer`);
        let cate_cured_5 = cate_5.sum_val(`cured`);

        ap +=
        `
        <tr>
	  <th>${user_name==MSD_smn?`店舗${cell.obj_id}`:cell.obj_name}</th>
          <td>${data_0}</td>
          <td>${data_1}</td>
          <td>${data_2}</td>
          <td>${data_12}</td>
	  <td>${data_13}</td>
	  <td>${data_3}</td>
	  <td>${data_14}</td>
	  <td>${data_15}</td>
          <td>${data_4}</td>
          <td>${data_5}</td>
          <td>${data_11}</td>
          <td>${data_7}</td>
          <td>${data_8}</td>
          <td>${data_9}</td>
          <td>${data_10}</td>

          <td>${lity_0}</td>
          <td>${lity_1}</td>
          <td>${lity_2}</td>
          <td>${lity_3}</td>
          <td>${lity_4}</td>

          <td>${cate_s_0}</td>
          <td>${cate_f_0}</td>
          <td>${cate_c_0}</td>
	  <td>${cate_pure_0}</td>
	  <td>${cate_newer_0}</td>
	  <td>${cate_cured_0}</td>
          <td>${cate_a_0}</td>

          <td>${cate_s_1}</td>
          <td>${cate_f_1}</td>
          <td>${cate_c_1}</td>
	  <td>${cate_pure_1}</td>
          <td>${cate_newer_1}</td>
          <td>${cate_cured_1}</td>
          <td>${cate_a_1}</td>

          <td>${cate_s_2}</td>
          <td>${cate_f_2}</td>
          <td>${cate_c_2}</td>
	  <td>${cate_pure_2}</td>
          <td>${cate_newer_2}</td>
          <td>${cate_cured_2}</td>
          <td>${cate_a_2}</td>

          <td>${cate_s_3}</td>
          <td>${cate_f_3}</td>
          <td>${cate_c_3}</td>
	  <td>${cate_pure_3}</td>
          <td>${cate_newer_3}</td>
          <td>${cate_cured_3}</td>
          <td>${cate_a_3}</td>

          <td>${cate_s_4}</td>
          <td>${cate_f_4}</td>
          <td>${cate_c_4}</td>
	  <td>${cate_pure_4}</td>
          <td>${cate_newer_4}</td>
          <td>${cate_cured_4}</td>
          <td>${cate_a_4}</td>

          <td>${cate_s_5}</td>
          <td>${cate_f_5}</td>
          <td>${cate_c_5}</td>
	  <td>${cate_pure_5}</td>
          <td>${cate_newer_5}</td>
          <td>${cate_cured_5}</td>
          <td>${cate_a_5}</td>
        </tr>
        `;
      });
      $('#table_clinic').html(
        `
        <tr>
          <th>店舗別</th>

          <th>${ps.str_date(`.`)}</th>
          <th>~</th>
          <th>${pe.str_date(`.`)}</th>
        </tr>
        <tr>
          <th>--</th>
          <th>主要項目</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
	  <th></th>
	  <th></th>
	  <th></th>
	  <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>効率</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>柔整</th>
          <th></th>
          <th></th>
          <th></th>
	  <th></th>
	  <th></th>
	  <th></th>
          <th>鍼灸</th>
          <th></th>
          <th></th>
          <th></th>
	  <th></th>
	  <th></th>
	  <th></th>
          <th>マッサージ</th>
          <th></th>
          <th></th>
          <th></th>
	  <th></th>
	  <th></th>
	  <th></th>
          <th>自賠責</th>
          <th></th>
          <th></th>
          <th></th>
	  <th></th>
	  <th></th>
	  <th></th>
          <th>労災</th>
          <th></th>
          <th></th>
          <th></th>
	  <th></th>
	  <th></th>
	  <th></th>
          <th>生活保護</th>
          <th></th>
          <th></th>
          <th></th>
	  <th></th>
	  <th></th>
	  <th></th>
        </tr>
        <tr>
          <th>--</th>
          <th>総合売上</th>
          <th>保険請求額</th>
          <th>保険負担金</th>
          <th>自費施術売上</th>
	  <th>物販売上</th>
	  <th>自費総合売上</th>
	  <th>自費施術回数</th>
	  <th>物販数</th>
          <th>施術回数</th>
          <th>来院数</th>
          <th>純患数</th>
          <th>新患数</th>
          <th>完治者数</th>
          <th>施術時間</th>
          <th>2回目の来院者数</th>

          <th>自費客単価</th>
          <th>自費時間単価</th>
          <th>平均来院数</th>
          <th>新患割合</th>
          <th>既存割合</th>

          <th>請求額</th>
          <th>負担金</th>
          <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
          <th>1日平均来院</th>

          <th>請求額</th>
          <th>負担金</th>
          <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
          <th>1日平均来院</th>

          <th>請求額</th>
          <th>負担金</th>
          <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
          <th>1日平均来院</th>

          <th>請求額</th>
          <th>負担金</th>
          <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
          <th>1日平均来院</th>

          <th>請求額</th>
          <th>負担金</th>
          <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
          <th>1日平均来院</th>

          <th>請求額</th>
          <th>負担金</th>
          <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
          <th>1日平均来院</th>
        </tr>

        ${ap}
        `
      );
    })();
    (() => {
      $('#table_clinic_base').html(``);

      if (clt_id == 10016) {
        objs = objs.filter(({obj_id}) => obj_id >= 0);
        objs.forEach((cell) => {
          let obj = datas.filter(({obj_id}) => obj_id == cell.obj_id);
          let repeat = repeats.filter(({obj_id}) => obj_id == cell.obj_id)

          let ap = ``;
          let day_pa = period_map(ps,pe,0);

          for (let i = 0;i < pa.length;i++) {
            let label = pa[i];

            let result = obj.filter(({period}) => period == label);

            let data_0 = result.sum_val(`data_5`);

            let cate = cates.filter(({obj_id}) => obj_id == cell.obj_id).filter(({period}) => period == label);

            let cate_0 = cate.filter(({type}) => type == 11);//柔整
            let cate_1 = cate.filter(({type}) => type == 12);//鍼灸
            let cate_2 = cate.filter(({type}) => type == 14 || type == 15);//自賠,労災
            let cate_3 = cate.filter(({type}) => type == 1);//自費
            let cate_4 = cate.filter(({type}) => type == 2);//物販

            let cate_count_0 = cate_0.sum_val(`data_4`);
            let cate_hutan_0 = cate_0.sum_val(`data_2`);
            let cate_seikyu_0 = cate_0.sum_val(`data_1`);
            let cate_total_0 = cate_0.sum_val(`data_0`);

            let cate_count_1 = cate_1.sum_val(`data_4`);
            let cate_hutan_1 = cate_1.sum_val(`data_2`);
            let cate_seikyu_1 = cate_1.sum_val(`data_1`);
            let cate_total_1 = cate_1.sum_val(`data_0`);

            let cate_count_2 = cate_2.sum_val(`data_4`);
            let cate_seikyu_2 = cate_2.sum_val(`data_1`);

            let cate_count_3 = cate_3.sum_val(`data_4`);
            let cate_mado_3 = cate_3.sum_val(`data_0`);

            let cate_count_4 = cate_4.sum_val(`data_4`);
            let cate_mado_4 = cate_4.sum_val(`data_0`);

            let data_1 = cate_hutan_0 + cate_hutan_1 + cate_mado_3 + cate_mado_4;
            let data_2 = cate_seikyu_0 + cate_seikyu_1 + cate_seikyu_2 + data_1;
            let data_3 = data_1;

            let pay_cash = result.sum_val('pay_cash');
            let pay_credit = result.sum_val('pay_credit');
            let chousei = result.sum_val('chousei');

            ap +=
            `
            <tr>
              <th>${label.str_date(`.`)}</th>
              <td>${data_0}</td>
              <td>${cate_count_0}</td>
              <td>${cate_hutan_0}</td>
              <td>${cate_seikyu_0}</td>
              <td>${cate_total_0}</td>
              <td>${cate_count_1}</td>
              <td>${cate_hutan_1}</td>
              <td>${cate_seikyu_1}</td>
              <td>${cate_total_1}</td>
              <td>${cate_count_2}</td>
              <td>${cate_seikyu_2}</td>
              <td>${cate_count_3}</td>
              <td>${cate_mado_3}</td>
              <td>${cate_count_4}</td>
              <td>${cate_mado_4}</td>
              <td>${data_1}</td>
              <td>${data_2}</td>
              <td>${cate_hutan_0}</td>
              <td>${cate_hutan_1}</td>
              <td>${cate_mado_3}</td>
              <td>${cate_mado_4}</td>
              <td>${data_3}</td>
              <td>${pay_cash}</td>
              <td>${pay_credit}</td>
              <td>${chousei}</td>
            </tr>
            `;
          }
          $('#table_clinic_base').append(
            `
            <table data-sheet-name="${cell.obj_id}-${user_name==MSD_smn?`店舗${cell.obj_id}`:cell.obj_name}">
              <tr>
		${user_name==MSD_smn?`店舗${cell.obj_id}`:cell.obj_name}
                <th>${ps.str_date(`.`)}</th>
                <th>~</th>
                <th>${pe.str_date(`.`)}</th>
              </tr>
              <tr>
                <th>--</th>
                <th>来院数</th>
                <th>柔整人数</th>
                <th>柔整負担</th>
                <th>柔整請求</th>
                <th>柔整合計</th>
                <th>鍼灸人数</th>
                <th>鍼灸負担</th>
                <th>鍼灸請求</th>
                <th>鍼灸合計</th>
                <th>自賠労災人数</th>
                <th>自賠労災請求</th>
                <th>自費人数</th>
                <th>自費売上</th>
                <th>物販個数</th>
                <th>物販売上</th>
                <th>窓口売上</th>
                <th>売上合計</th>
                <th>柔整負担</th>
                <th>鍼灸負担</th>
                <th>自費売上</th>
                <th>物販売上</th>
                <th>収入合計</th>
                <th>現金実査</th>
                <th>クレジット売上</th>
                <th>調整額</th>
              </tr>
              ${ap}
            </table>
            `
          );
        });
      } else if (clt_id == 10025) {
	objs = objs.filter(({obj_id}) => obj_id >= 0);
        objs.forEach((cell) => {
          let obj = datas.filter(({obj_id}) => obj_id == cell.obj_id);

          let ap = ``;

          for (let i = 0;i < pa.length;i++) {
            let label = pa[i];
      
            let result = obj.filter(({period}) => period == label);

            let crnum = result.sum_val(`crnum`),
            firstnum = result.sum_val(`firstnum`),
            hoken_futan = result.sum_val(`hoken_futan`),
            shiteiko = result.sum_val(`shiteiko`),
            homon_shinkyu = result.sum_val(`homon_shinkyu`),
            tokuden = result.sum_val(`tokuden`),
            buppin = result.sum_val(`buppin`),
            hari = result.sum_val(`hari`),
            sanso = result.sum_val(`sanso`),
            shindansho = result.sum_val(`shindansho`),
            jihi = result.sum_val(`jihi`),
            bumon = hoken_futan + shiteiko + homon_shinkyu + tokuden + buppin + hari + sanso + shindansho + jihi,
            henkin = result.sum_val(`henkin`),
            total = bumon + henkin;

            ap +=
            `
            <tr>
              <th>${label.str_date(`.`)}</th>
              <td>${crnum}</td>
              <td>${firstnum}</td>
              <td>${hoken_futan}</td>
              <td>${shiteiko}</td>
              <td>${homon_shinkyu}</td>
              <td>${tokuden}</td>
              <td>${buppin}</td>
              <td>${hari}</td>
              <td>${sanso}</td>
              <td>${shindansho}</td>
              <td>${jihi}</td>
              <td>${bumon}</td>
              <td>${henkin}</td>
              <td>${total}</td>
            </tr>
            `;
          }
          $('#table_clinic_base').append(
          `
          <table data-sheet-name="${cell.obj_id}-${user_name==MSD_smn?`店舗${cell.obj_id}`:cell.obj_name}">
            <tr>
	      <th>${user_name==MSD_smn?`店舗${cell.obj_id}`:cell.obj_name}</tH>
              <th>${ps.str_date(`.`)}</th>
              <th>~</th>
              <th>${pe.str_date(`.`)}</th>
            </tr>
            <tr>
              <th>--</th>
              <th>来院数</th>
              <th>新患数</th>
              <th>一部負担金・往診</th>
              <th>強化指定校</th>
              <th>訪問鍼灸</th>
              <th>小計(特電)</th>
              <th>小計(物品)</th>
              <th>小計(鍼灸・美容)</th>
              <th>小計(酸素)</th>
              <th>小計(診断書)</th>
              <th>自費</th>
              <th>部門(1,2,3,4,5)</th>
              <th>返金額</th>
              <th>合計</th>
            </tr>
            ${ap}
          </table>
          `
          );
        });
      } else {
        objs = objs.filter(({obj_id}) => obj_id >= 0);
        objs.forEach((cell) => {
          let obj = datas.filter(({obj_id}) => obj_id == cell.obj_id);
          let repeat = repeats.filter(({obj_id}) => obj_id == cell.obj_id)

          let ap = ``;
          let day_pa = period_map(ps,pe,0);

          for (let i = 0;i < pa.length;i++) {
            let label = pa[i];

            let result = obj.filter(({period}) => period == label);

            let data_0 = result.sum_val(`data_0`);
            let data_1 = result.sum_val(`data_1`);
            let data_2 = result.sum_val(`data_2`);
            let data_3 = result.sum_val(`data_3`);
            let data_4 = result.sum_val(`data_4`);
            let data_5 = result.sum_val(`data_5`);
            let data_6 = result.sum_val(`data_6`);
            let data_7 = result.sum_val(`data_7`);
            let data_8 = result.sum_val(`data_8`);
            let data_9 = result.sum_val(`data_9`);
            let data_10 = result.sum_val(`data_10`);


            let data_12 = result.sum_val(`data_12`);
            let data_13 = result.sum_val(`data_13`);
            let data_14 = result.sum_val(`data_14`);
            let data_15 = result.sum_val(`data_15`);

            let lity_0 = data_3.to_devide(data_5);
            let lity_1 = data_3.to_devide(data_9);
            let lity_2 = data_5.to_Perate(data_6);
            let lity_3 = data_7.to_perate(data_5);
            let lity_4 = (data_5 - data_7).to_perate(data_5);


            let cate = cates.filter(({obj_id}) => obj_id == cell.obj_id).filter(({period}) => period == label);

            let cate_0 = cate.filter(({type}) => type == 11);
            let cate_1 = cate.filter(({type}) => type == 12);
            let cate_2 = cate.filter(({type}) => type == 13);
            let cate_3 = cate.filter(({type}) => type == 14);
            let cate_4 = cate.filter(({type}) => type == 15);
            let cate_5 = cate.filter(({type}) => type == 16);

            let cate_s_0 = cate_0.sum_val(`data_1`);
            let cate_f_0 = cate_0.sum_val(`data_2`);
            let cate_c_0 = cate_0.sum_val(`data_4`);
            let cate_a_0 = cate_c_0.to_Perate(day_pa.length);
            let cate_pure_0 = cate_0.sum_val(`pure_customer`);
let cate_newer_0 = cate_0.sum_val(`newer`);
let cate_cured_0 = cate_0.sum_val(`cured`);

            let cate_s_1 = cate_1.sum_val(`data_1`);
            let cate_f_1 = cate_1.sum_val(`data_2`);
            let cate_c_1 = cate_1.sum_val(`data_4`);
            let cate_a_1 = cate_c_1.to_Perate(day_pa.length);
let cate_pure_1 = cate_1.sum_val(`pure_customer`);
let cate_newer_1 = cate_1.sum_val(`newer`);
let cate_cured_1 = cate_1.sum_val(`cured`);

            let cate_s_2 = cate_2.sum_val(`data_1`);
            let cate_f_2 = cate_2.sum_val(`data_2`);
            let cate_c_2 = cate_2.sum_val(`data_4`);
            let cate_a_2 = cate_c_2.to_Perate(day_pa.length);
let cate_pure_2 = cate_2.sum_val(`pure_customer`);
let cate_newer_2 = cate_2.sum_val(`newer`);
let cate_cured_2 = cate_2.sum_val(`cured`);

            let cate_s_3 = cate_3.sum_val(`data_1`);
            let cate_f_3 = cate_3.sum_val(`data_2`);
            let cate_c_3 = cate_3.sum_val(`data_4`);
            let cate_a_3 = cate_c_3.to_Perate(day_pa.length);
let cate_pure_3 = cate_3.sum_val(`pure_customer`);
let cate_newer_3 = cate_3.sum_val(`newer`);
let cate_cured_3 = cate_3.sum_val(`cured`);

            let cate_s_4 = cate_4.sum_val(`data_1`);
            let cate_f_4 = cate_4.sum_val(`data_2`);
            let cate_c_4 = cate_4.sum_val(`data_4`);
            let cate_a_4 = cate_c_4.to_Perate(day_pa.length);
let cate_pure_4 = cate_4.sum_val(`pure_customer`);
let cate_newer_4 = cate_4.sum_val(`newer`);
let cate_cured_4 = cate_4.sum_val(`cured`);

            let cate_s_5 = cate_5.sum_val(`data_1`);
            let cate_f_5 = cate_5.sum_val(`data_2`);
            let cate_c_5 = cate_5.sum_val(`data_4`);
            let cate_a_5 = cate_c_5.to_Perate(day_pa.length);
let cate_pure_5 = cate_5.sum_val(`pure_customer`);
let cate_newer_5 = cate_5.sum_val(`newer`);
let cate_cured_5 = cate_5.sum_val(`cured`);


            let repe = repeat.filter(({period}) => period == label);
            let repe_origin = repe.filter(({count_num}) => count_num == 1).sum_val('count');
            let repe_0 = repe.filter(({count_num}) => count_num == 1);
            let repe_1 = repe.filter(({count_num}) => count_num == 2);
            let repe_2 = repe.filter(({count_num}) => count_num == 4);
            let repe_3 = repe.filter(({count_num}) => count_num == 8);
            let repe_4 = repe.filter(({count_num}) => count_num == 10);


            let am = result.sum_val('am');
            let pm = result.sum_val('pm');

            let holiday = result.sum_val('holiday');
            let weekday = result.sum_val('weekday');

            let gen0 = result.sum_val('gen0');
            let gen1 = result.sum_val('gen1');

            let gene0 = result.sum_val('gene0');
            let gene1 = result.sum_val('gene1');
            let gene2 = result.sum_val('gene2');
            let gene3 = result.sum_val('gene3');
            let gene4 = result.sum_val('gene4');

            ap +=
            `
            <tr>
              <th>${label.str_date(`.`)}</th>
              <td>${data_0}</td>
              <td>${data_1}</td>
              <td>${data_2}</td>
	      <td>${data_12}</td>
              <td>${data_13}</td>
              <td>${data_3}</td>
              <td>${data_14}</td>
              <td>${data_15}</td>

              <td>${data_4}</td>
              <td>${data_5}</td>
              <td>${data_6}</td>
              <td>${data_7}</td>
              <td>${data_8}</td>
              <td>${data_9}</td>
              <td>${data_10}</td>

              <td>${lity_0}</td>
              <td>${lity_1}</td>
              <td>${lity_2}</td>
              <td>${lity_3}</td>
              <td>${lity_4}</td>

              <td>${cate_s_0}</td>
              <td>${cate_f_0}</td>
              <td>${cate_c_0}</td>
	      <td>${cate_pure_0}</td>
<td>${cate_newer_0}</td>
<td>${cate_cured_0}</td>

              <td>${cate_s_1}</td>
              <td>${cate_f_1}</td>
              <td>${cate_c_1}</td>
	      <td>${cate_pure_1}</td>
<td>${cate_newer_1}</td>
<td>${cate_cured_1}</td>

              <td>${cate_s_2}</td>
              <td>${cate_f_2}</td>
              <td>${cate_c_2}</td>
	      <td>${cate_pure_2}</td>
<td>${cate_newer_2}</td>
<td>${cate_cured_2}</td>

              <td>${cate_s_3}</td>
              <td>${cate_f_3}</td>
              <td>${cate_c_3}</td>
	      <td>${cate_pure_3}</td>
<td>${cate_newer_3}</td>
<td>${cate_cured_3}</td>

              <td>${cate_s_4}</td>
              <td>${cate_f_4}</td>
              <td>${cate_c_4}</td>
	      <td>${cate_pure_4}</td>
<td>${cate_newer_4}</td>
<td>${cate_cured_4}</td>

              <td>${cate_s_5}</td>
              <td>${cate_f_5}</td>
              <td>${cate_c_5}</td>
	      <td>${cate_pure_5}</td>
<td>${cate_newer_5}</td>
<td>${cate_cured_5}</td>

              <td>${repe_0.sum_val('count')}</td>
              <td>${repe_0.sum_val('count').to_perate(repe_origin)}%</td>
              <td>${repe_1.sum_val('count')}</td>
              <td>${repe_1.sum_val('count').to_perate(repe_origin)}%</td>
              <td>${repe_2.sum_val('count')}</td>
              <td>${repe_2.sum_val('count').to_perate(repe_origin)}%</td>
              <td>${repe_3.sum_val('count')}</td>
              <td>${repe_3.sum_val('count').to_perate(repe_origin)}%</td>
              <td>${repe_4.sum_val('count')}</td>
              <td>${repe_4.sum_val('count').to_perate(repe_origin)}%</td>

              <td>${am}</td>
              <td>${pm}</td>

              <td>${holiday}</td>
              <td>${weekday}</td>

              <td>${gen0}</td>
              <td>${gen1}</td>

              <td>${gene0}</td>
              <td>${gene1}</td>
              <td>${gene2}</td>
              <td>${gene3}</td>
              <td>${gene4}</td>
            </tr>
            `;
          }

          $('#table_clinic_base').append(
            `
            <table data-sheet-name="${cell.obj_id}-${user_name==MSD_smn?`店舗${cell.obj_id}`:cell.obj_name}">
              <tr>
		<th>${user_name==MSD_smn?`店舗${cell.obj_id}`:cell.obj_name}</th>
                <th>${ps.str_date(`.`)}</th>
                <th>~</th>
                <th>${pe.str_date(`.`)}</th>
              </tr>
              <tr>
                <th>--</th>
                <th>主要項目</th>
                <th></th>
                <th></th>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>

                <th>効率</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>

                <th>柔整</th>
                <th></th>
                <th></th>
                <th></th>
		<th></th>
		<th></th>
                <th>鍼灸</th>
                <th></th>
                <th></th>
		<th></th>
		<th></th>
		<th></th>
                <th>マッサージ</th>
                <th></th>
                <th></th>
                <th></th>
		<th></th>
		<th></th>
                <th>自賠責</th>
                <th></th>
                <th></th>
                <th></th>
		<th></th>
		<th></th>
                <th>労災</th>
                <th></th>
                <th></th>
		<th></th>
		<th></th>
		<th></th>
                <th>生活保護</th>
                <th></th>
                <th></th>
		<th></th>
		<th></th>
		<th></th>
                <th>継続率</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>

                <th>来店時間</th>
                <th></th>
                <th>来店日</th>
                <th></th>

                <th>性別</th>
                <th></th>
                <th>年代</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th>--</th>
                <th>総合売上</th>
                <th>保険請求額</th>
                <th>保険負担金</th>
		<th>自費施術売上</th>
                <th>物販売上</th>
                <th>自費総合売上</th>
                <th>自費施術回数</th>
                <th>物販数</th>
                <th>施術回数</th>
                <th>来院数</th>
                <th>純患数</th>
                <th>新患数</th>
                <th>完治者数</th>
                <th>施術時間</th>
                <th>2回目の来院者数</th>
                <th>自費客単価</th>
                <th>自費時間単価</th>
                <th>平均来院数</th>
                <th>新患割合</th>
                <th>既存割合</th>

                <th>請求額</th>
                <th>負担金</th>
                <th>来院数</th>
		<th>純患数</th>
		<th>新患数</th>
		<th>完治者数</th>

                <th>請求額</th>
                <th>負担金</th>
                <th>来院数</th>
		<th>純患数</th>
<th>新患数</th>
<th>完治者数</th>

                <th>請求額</th>
                <th>負担金</th>
                <th>来院数</th>
		<th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
                <th>請求額</th>
                <th>負担金</th>
                <th>来院数</th>
		<th>純患数</th>
<th>新患数</th>
<th>完治者数</th>

                <th>請求額</th>
                <th>負担金</th>
                <th>来院数</th>
		<th>純患数</th>
<th>新患数</th>
<th>完治者数</th>

                <th>請求額</th>
                <th>負担金</th>
                <th>来院数</th>
		<th>純患数</th>
<th>新患数</th>
<th>完治者数</th>

                <th>1回目人数</th>
                <th>1回目維持率</th>
                <th>2回目</th>
                <th>2回目維持率</th>
                <th>4回目</th>
                <th>4回目維持率</th>
                <th>8回目</th>
                <th>8回目維持率</th>
                <th>10回以上</th>
                <th>10回以上維持率</th>

                <th>午前</th>
                <th>午後</th>
                <th>平日</th>
                <th>休日</th>

                <th>男性</th>
                <th>女性</th>
                <th>19歳以下</th>
                <th>20~39歳</th>
                <th>40~64歳</th>
                <th>65~74歳</th>
                <th>75歳以上</th>
              </tr>
              ${ap}
            </table>
            `
          );
        });
      }
    })();
    (() => {
      let wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      };
      let workbook = {
        SheetNames: [],
        Sheets: {}
      };
      document.querySelectorAll('#clinic_table_base table').forEach(function (currentValue, index) {
        let n = currentValue.getAttribute('data-sheet-name');
        if (!n) {n = 'Sheet' + index;}
        workbook.SheetNames.push(n);
        workbook.Sheets[n] = XLSX.utils.table_to_sheet(currentValue, wopts);
      });
      let wbout = XLSX.write(workbook, wopts);
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
      }
      saveAs(new Blob([s2ab(wbout)], {
        type: 'application/octet-stream'
      }), `medicalCRM店舗別帳票.xlsx`);
    })();
  });
  $(document).off('click','#rstbtn1').on('click','#rstbtn1',function() {
    let objs = data.data.data3;
    let datas = data.data.data10;
    let cates = data.data.data11;
    let repeats = data.data.data12;

    (() => {
      let ap = ``;

      objs.forEach((cell) => {
        let result = datas.filter(({obj_id}) => obj_id == cell.obj_id);

        let data_0 = result.sum_val(`data_0`);
        let data_1 = result.sum_val(`data_1`);
        let data_2 = result.sum_val(`data_2`);
        let data_3 = result.sum_val(`data_3`);
        let data_4 = result.sum_val(`data_4`);
        let data_5 = result.sum_val(`data_5`);
        let data_6 = result.sum_val(`data_6`);
        let data_7 = result.sum_val(`data_7`);
        let data_8 = result.sum_val(`data_8`);
        let data_9 = result.sum_val(`data_9`);
	let data_11 = result.sum_val(`data_11`);      

	if (clt_id == 10010) {
          if (!data_11 && cell.sf_enabled == 0) {
            return;
          }
	}

	let data_12 = result.sum_val(`data_12`);
        let data_13 = result.sum_val(`data_13`);
        let data_14 = result.sum_val(`data_14`);
        let data_15 = result.sum_val(`data_15`);

        let lity_0 = data_3.to_devide(data_5);
        let lity_1 = data_3.to_devide(data_9);
        let lity_2 = data_5.to_Perate(data_6);
        let lity_3 = data_7.to_perate(data_5);
        let lity_4 = (data_5 - data_7).to_perate(data_5);

        let cate = cates.filter(({obj_id}) => obj_id == cell.obj_id);

        let cate_0 = cate.filter(({type}) => type == 11);
        let cate_1 = cate.filter(({type}) => type == 12);
        let cate_2 = cate.filter(({type}) => type == 13);
        let cate_3 = cate.filter(({type}) => type == 14);
        let cate_4 = cate.filter(({type}) => type == 15);
        let cate_5 = cate.filter(({type}) => type == 16);

        let cate_s_0 = cate_0.sum_val(`data_1`);
        let cate_f_0 = cate_0.sum_val(`data_2`);
	let cate_c_0 = cate_0.sum_val(`data_4`);
	let cate_pure_0 = cate_0.sum_val(`pure_customer`);
let cate_newer_0 = cate_0.sum_val(`newer`);
let cate_cured_0 = cate_0.sum_val(`cured`);

        let cate_s_1 = cate_1.sum_val(`data_1`);
        let cate_f_1 = cate_1.sum_val(`data_2`);
	let cate_c_1 = cate_1.sum_val(`data_4`);
	let cate_pure_1 = cate_1.sum_val(`pure_customer`);
let cate_newer_1 = cate_1.sum_val(`newer`);
let cate_cured_1 = cate_1.sum_val(`cured`);

        let cate_s_2 = cate_2.sum_val(`data_1`);
        let cate_f_2 = cate_2.sum_val(`data_2`);
	let cate_c_2 = cate_2.sum_val(`data_4`);
	let cate_pure_2 = cate_2.sum_val(`pure_customer`);
let cate_newer_2 = cate_2.sum_val(`newer`);
let cate_cured_2 = cate_2.sum_val(`cured`);

        let cate_s_3 = cate_3.sum_val(`data_1`);
        let cate_f_3 = cate_3.sum_val(`data_2`);
	let cate_c_3 = cate_3.sum_val(`data_4`);
	let cate_pure_3 = cate_3.sum_val(`pure_customer`);
let cate_newer_3 = cate_3.sum_val(`newer`);
let cate_cured_3 = cate_3.sum_val(`cured`);

        let cate_s_4 = cate_4.sum_val(`data_1`);
        let cate_f_4 = cate_4.sum_val(`data_2`);
	let cate_c_4 = cate_4.sum_val(`data_4`);
	let cate_pure_4 = cate_4.sum_val(`pure_customer`);
let cate_newer_4 = cate_4.sum_val(`newer`);
let cate_cured_4 = cate_4.sum_val(`cured`);

        let cate_s_5 = cate_5.sum_val(`data_1`);
        let cate_f_5 = cate_5.sum_val(`data_2`);
	let cate_c_5 = cate_5.sum_val(`data_4`);
	let cate_pure_5 = cate_5.sum_val(`pure_customer`);
let cate_newer_5 = cate_5.sum_val(`newer`);
let cate_cured_5 = cate_5.sum_val(`cured`);

        ap +=
        `
        <tr>
	  <th>${user_name==MSD_smn?`担当者${cell.obj_id}`:cell.obj_name}</th>
	  <th>${user_name==MSD_smn?`店舗${cell.obj_id}`:cell.clinic_name}</th>
          <td>${data_0}</td>
          <td>${data_1}</td>
          <td>${data_2}</td>
	  <td>${data_12}</td>
          <td>${data_13}</td>
          <td>${data_3}</td>
          <td>${data_14}</td>
          <td>${data_15}</td>
          <td>${data_4}</td>
          <td>${data_5}</td>
          <td>${data_11}</td>
          <td>${data_7}</td>
          <td>${data_8}</td>
          <td>${data_9}</td>

          <td>${lity_0}</td>
          <td>${lity_1}</td>
          <td>${lity_2}</td>
          <td>${lity_3}</td>
          <td>${lity_4}</td>

          <td>${cate_s_0}</td>
          <td>${cate_f_0}</td>
	  <td>${cate_c_0}</td>
	  <td>${cate_pure_0}</td>
<td>${cate_newer_0}</td>
<td>${cate_cured_0}</td>
          <td>${cate_s_1}</td>
          <td>${cate_f_1}</td>
	  <td>${cate_c_1}</td>
	  <td>${cate_pure_1}</td>
<td>${cate_newer_1}</td>
<td>${cate_cured_1}</td>
          <td>${cate_s_2}</td>
          <td>${cate_f_2}</td>
	  <td>${cate_c_2}</td>
	  <td>${cate_pure_2}</td>
<td>${cate_newer_2}</td>
<td>${cate_cured_2}</td>
          <td>${cate_s_3}</td>
          <td>${cate_f_3}</td>
	  <td>${cate_c_3}</td>
	  <td>${cate_pure_3}</td>
<td>${cate_newer_3}</td>
<td>${cate_cured_3}</td>
          <td>${cate_s_4}</td>
          <td>${cate_f_4}</td>
	  <td>${cate_c_4}</td>
	  <td>${cate_pure_4}</td>
<td>${cate_newer_4}</td>
<td>${cate_cured_4}</td>
          <td>${cate_s_5}</td>
          <td>${cate_f_5}</td>
	  <td>${cate_c_5}</td>
	  <td>${cate_pure_5}</td>
<td>${cate_newer_5}</td>
<td>${cate_cured_5}</td>
        </tr>
        `;
      });
      $('#table_staff').html(
        `
        <tr>
          <th>担当者別</th>
          <th>${ps.str_date(`.`)}</th>
          <th>~</th>
          <th>${pe.str_date(`.`)}</th>
        </tr>
        <tr>
          <th>--</th>
          <th>--</th>
          <th>主要項目</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
	  <th></th>
	  <th></th>
	  <th></th>
	  <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>効率</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>柔整</th>
          <th></th>
	  <th></th>
	  <th></th>
<th></th>
<th></th>
          <th>鍼灸</th>
          <th></th>
	  <th></th>
	  <th></th>
<th></th>
<th></th>
          <th>マッサージ</th>
          <th></th>
	  <th></th>
	  <th></th>
<th></th>
<th></th>
          <th>自賠責</th>
          <th></th>
	  <th></th>
	  <th></th>
<th></th>
<th></th>
          <th>労災</th>
          <th></th>
	  <th></th>
	  <th></th>
<th></th>
<th></th>
          <th>生活保護</th>
          <th></th>
	  <th></th>
	  <th></th>
<th></th>
<th></th>
        </tr>
        <tr>
          <th>--</th>
          <th>所属院</th>
          <th>総合売上</th>
          <th>保険請求額</th>
          <th>保険負担金</th>
	  <th>自費施術売上</th>
          <th>物販売上</th>
          <th>自費総合売上</th>
          <th>自費施術回数</th>
          <th>物販数</th>
          <th>施術回数</th>
          <th>来院数</th>
          <th>純患数</th>
          <th>新患数</th>
          <th>完治者数</th>
          <th>施術時間</th>
          <th>自費客単価</th>
          <th>自費時間単価</th>
          <th>平均来院数</th>
          <th>新患割合</th>
          <th>既存割合</th>

          <th>請求額</th>
          <th>負担金</th>
	  <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
          <th>請求額</th>
          <th>負担金</th>
	  <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
          <th>請求額</th>
          <th>負担金</th>
	  <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
          <th>請求額</th>
          <th>負担金</th>
	  <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
          <th>請求額</th>
          <th>負担金</th>
	  <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
          <th>請求額</th>
          <th>負担金</th>
	  <th>来院数</th>
	  <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
        </tr>
        ${ap}
        `
      );
    })();
    (() => {
      $('#table_staff_base').html(``);


if (clt_id == 10025) {
	objs = objs.filter(({obj_id}) => obj_id >= 0);
  objs.forEach((cell) => {
    let obj = datas.filter(({obj_id}) => obj_id == cell.obj_id);
    let ap = ``;

    for (let i = 0;i < pa.length;i++) {
      let label = pa[i];

      let result = obj.filter(({period}) => period == label);

      let crnum = result.sum_val(`crnum`),
      firstnum = result.sum_val(`firstnum`),
      hoken_futan = result.sum_val(`hoken_futan`),
      shiteiko = result.sum_val(`shiteiko`),
      homon_shinkyu = result.sum_val(`homon_shinkyu`),
      tokuden = result.sum_val(`tokuden`),
      buppin = result.sum_val(`buppin`),
      hari = result.sum_val(`hari`),
      sanso = result.sum_val(`sanso`),
      shindansho = result.sum_val(`shindansho`),
      jihi = result.sum_val(`jihi`),
      bumon = hoken_futan + shiteiko + homon_shinkyu + tokuden + buppin + hari + sanso + shindansho + jihi,
      henkin = result.sum_val(`henkin`),
      total = bumon + henkin;

      ap +=
      `
      <tr>
        <th>${label.str_date(`.`)}</th>
        <td>${crnum}</td>
        <td>${firstnum}</td>
        <td>${hoken_futan}</td>
        <td>${shiteiko}</td>
        <td>${homon_shinkyu}</td>
        <td>${tokuden}</td>
        <td>${buppin}</td>
        <td>${hari}</td>
        <td>${sanso}</td>
        <td>${shindansho}</td>
        <td>${jihi}</td>
        <td>${bumon}</td>
        <td>${henkin}</td>
        <td>${total}</td>
      </tr>
      `;
    }
    $('#table_staff_base').append(
      `
      <table data-sheet-name="${cell.obj_id}-${user_name==MSD_smn?`担当者${cell.obj_id}`:cell.obj_name}">
        <tr>
	  <th>${user_name==MSD_smn?`担当者${cell.obj_id}`:cell.obj_name}</th>
          <th>${ps.str_date(`.`)}</th>
          <th>~</th>
          <th>${pe.str_date(`.`)}</th>
        </tr>
        <tr>
          <th>--</th>
          <th>来院数</th>
          <th>新患数</th>
          <th>一部負担金・往診</th>
          <th>強化指定校</th>
          <th>訪問鍼灸</th>
          <th>小計(特電)</th>
          <th>小計(物品)</th>
          <th>小計(鍼灸・美容)</th>
          <th>小計(酸素)</th>
          <th>小計(診断書)</th>
          <th>自費</th>
          <th>部門(1,2,3,4,5)</th>
          <th>返金額</th>
          <th>合計</th>
        </tr>
        ${ap}
      </table>
      `
    );
  });

      } else {



 
      objs = objs.filter(({obj_id}) => obj_id >= 0);
      objs.forEach((cell) => {
        let obj = datas.filter(({obj_id}) => obj_id == cell.obj_id);
        let repeat = repeats.filter(({obj_id}) => obj_id == cell.obj_id)

        let ap = ``;

        for (let i = 0;i < pa.length;i++) {
          let label = pa[i];

          let result = obj.filter(({period}) => period == label);

          let data_0 = result.sum_val(`data_0`);
          let data_1 = result.sum_val(`data_1`);
          let data_2 = result.sum_val(`data_2`);
          let data_3 = result.sum_val(`data_3`);
          let data_4 = result.sum_val(`data_4`);
          let data_5 = result.sum_val(`data_5`);
          let data_6 = result.sum_val(`data_6`);
          let data_7 = result.sum_val(`data_7`);
          let data_8 = result.sum_val(`data_8`);
          let data_9 = result.sum_val(`data_9`);
  
	
          if (clt_id == 10010) {
            if (!data_5 && cell.sf_enabled == 0) {
              return;
            }
          }

          let data_12 = result.sum_val(`data_12`);
          let data_13 = result.sum_val(`data_13`);
          let data_14 = result.sum_val(`data_14`);
          let data_15 = result.sum_val(`data_15`);

          let lity_0 = data_3.to_devide(data_5);
          let lity_1 = data_3.to_devide(data_9);
          let lity_2 = data_5.to_Perate(data_6);
          let lity_3 = data_7.to_perate(data_5);
          let lity_4 = (data_5 - data_7).to_perate(data_5);


          let cate = cates.filter(({obj_id}) => obj_id == cell.obj_id);

          let cate_0 = cate.filter(({type}) => type == 11).filter(({period}) => period == label);
          let cate_1 = cate.filter(({type}) => type == 12).filter(({period}) => period == label);
          let cate_2 = cate.filter(({type}) => type == 13).filter(({period}) => period == label);
          let cate_3 = cate.filter(({type}) => type == 14).filter(({period}) => period == label);
          let cate_4 = cate.filter(({type}) => type == 15).filter(({period}) => period == label);
          let cate_5 = cate.filter(({type}) => type == 16).filter(({period}) => period == label);

          let cate_s_0 = cate_0.sum_val(`data_1`);
          let cate_f_0 = cate_0.sum_val(`data_2`);
		let cate_pure_0 = cate_0.sum_val(`pure_customer`);
let cate_newer_0 = cate_0.sum_val(`newer`);
let cate_cured_0 = cate_0.sum_val(`cured`);
          let cate_s_1 = cate_1.sum_val(`data_1`);
          let cate_f_1 = cate_1.sum_val(`data_2`);
		let cate_pure_1 = cate_1.sum_val(`pure_customer`);
let cate_newer_1 = cate_1.sum_val(`newer`);
let cate_cured_1 = cate_1.sum_val(`cured`);
          let cate_s_2 = cate_2.sum_val(`data_1`);
          let cate_f_2 = cate_2.sum_val(`data_2`);
		let cate_pure_2 = cate_2.sum_val(`pure_customer`);
let cate_newer_2 = cate_2.sum_val(`newer`);
let cate_cured_2 = cate_2.sum_val(`cured`);
          let cate_s_3 = cate_3.sum_val(`data_1`);
          let cate_f_3 = cate_3.sum_val(`data_2`);
		let cate_pure_3 = cate_3.sum_val(`pure_customer`);
let cate_newer_3 = cate_3.sum_val(`newer`);
let cate_cured_3 = cate_3.sum_val(`cured`);
          let cate_s_4 = cate_4.sum_val(`data_1`);
          let cate_f_4 = cate_4.sum_val(`data_2`);
		let cate_pure_4 = cate_4.sum_val(`pure_customer`);
let cate_newer_4 = cate_4.sum_val(`newer`);
let cate_cured_4 = cate_4.sum_val(`cured`);
          let cate_s_5 = cate_5.sum_val(`data_1`);
          let cate_f_5 = cate_5.sum_val(`data_2`);
		let cate_pure_5 = cate_5.sum_val(`pure_customer`);
let cate_newer_5 = cate_5.sum_val(`newer`);
let cate_cured_5 = cate_5.sum_val(`cured`);

		let cate_c_0 = cate_0.sum_val(`data_4`);
		let cate_c_1 = cate_1.sum_val(`data_4`);
		let cate_c_2 = cate_2.sum_val(`data_4`);
		let cate_c_3 = cate_3.sum_val(`data_4`);
		let cate_c_4 = cate_4.sum_val(`data_4`);
		let cate_c_5 = cate_5.sum_val(`data_4`);

          let repe = repeat.filter(({period}) => period == label);
          let repe_origin = repe.filter(({count_num}) => count_num == 1).sum_val('count');
          let repe_0 = repe.filter(({count_num}) => count_num == 1);
          let repe_1 = repe.filter(({count_num}) => count_num == 2);
          let repe_2 = repe.filter(({count_num}) => count_num == 4);
          let repe_3 = repe.filter(({count_num}) => count_num == 8);
          let repe_4 = repe.filter(({count_num}) => count_num == 10);


          let am = result.sum_val('am');
          let pm = result.sum_val('pm');

          let holiday = result.sum_val('holiday');
          let weekday = result.sum_val('weekday');

          let gen0 = result.sum_val('gen0');
          let gen1 = result.sum_val('gen1');

          let gene0 = result.sum_val('gene0');
          let gene1 = result.sum_val('gene1');
          let gene2 = result.sum_val('gene2');
          let gene3 = result.sum_val('gene3');
          let gene4 = result.sum_val('gene4');

          ap +=
          `
          <tr>
            <th>${label.str_date(`.`)}</th>
            <td>${data_0}</td>
            <td>${data_1}</td>
            <td>${data_2}</td>
	    <td>${data_12}</td>
            <td>${data_13}</td>
            <td>${data_3}</td>
            <td>${data_14}</td>
            <td>${data_15}</td>
            <td>${data_4}</td>
            <td>${data_5}</td>
            <td>${data_6}</td>
            <td>${data_7}</td>
            <td>${data_8}</td>
            <td>${data_9}</td>

            <td>${lity_0}</td>
            <td>${lity_1}</td>
            <td>${lity_2}</td>
            <td>${lity_3}</td>
            <td>${lity_4}</td>

            <td>${cate_s_0}</td>
            <td>${cate_f_0}</td>
	    <td>${cate_c_0}</td>
	    <td>${cate_pure_0}</td>
<td>${cate_newer_0}</td>
<td>${cate_cured_0}</td>
            <td>${cate_s_1}</td>
            <td>${cate_f_1}</td>
	    <td>${cate_c_1}</td>
	    <td>${cate_pure_1}</td>
<td>${cate_newer_1}</td>
<td>${cate_cured_1}</td>
            <td>${cate_s_2}</td>
            <td>${cate_f_2}</td>
	    <td>${cate_c_2}</td>
	    <td>${cate_pure_2}</td>
<td>${cate_newer_2}</td>
<td>${cate_cured_2}</td>
            <td>${cate_s_3}</td>
            <td>${cate_f_3}</td>
	    <td>${cate_c_3}</td>
	    <td>${cate_pure_3}</td>
<td>${cate_newer_3}</td>
<td>${cate_cured_3}</td>
            <td>${cate_s_4}</td>
            <td>${cate_f_4}</td>
	    <td>${cate_c_4}</td>
	    <td>${cate_pure_4}</td>
<td>${cate_newer_4}</td>
<td>${cate_cured_4}</td>
            <td>${cate_s_5}</td>
            <td>${cate_f_5}</td>
	    <td>${cate_c_5}</td>
	    <td>${cate_pure_5}</td>
<td>${cate_newer_5}</td>
<td>${cate_cured_5}</td>

            <td>${repe_0.sum_val('count')}</td>
            <td>${repe_0.sum_val('count').to_perate(repe_origin)}%</td>
            <td>${repe_1.sum_val('count')}</td>
            <td>${repe_1.sum_val('count').to_perate(repe_origin)}%</td>
            <td>${repe_2.sum_val('count')}</td>
            <td>${repe_2.sum_val('count').to_perate(repe_origin)}%</td>
            <td>${repe_3.sum_val('count')}</td>
            <td>${repe_3.sum_val('count').to_perate(repe_origin)}%</td>
            <td>${repe_4.sum_val('count')}</td>
            <td>${repe_4.sum_val('count').to_perate(repe_origin)}%</td>

            <td>${am}</td>
            <td>${pm}</td>

            <td>${holiday}</td>
            <td>${weekday}</td>

            <td>${gen0}</td>
            <td>${gen1}</td>

            <td>${gene0}</td>
            <td>${gene1}</td>
            <td>${gene2}</td>
            <td>${gene3}</td>
            <td>${gene4}</td>
          </tr>
          `;
        }

        $('#table_staff_base').append(
          `
          <table data-sheet-name="${cell.obj_id}-${user_name==MSD_smn?`担当者${cell.obj_id}`:cell.obj_name}">
            <tr>
	      <th>${user_name==MSD_smn?`担当者${cell.obj_id}`:cell.obj_name}</th>
              <th>${ps.str_date(`.`)}</th>
              <th>~</th>
              <th>${pe.str_date(`.`)}</th>
            </tr>
            <tr>
              <th>--</th>
              <th>主要項目</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
	      <th></th>
	      <th></th>
	      <th></th>
	      <th></th>

              <th>効率</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>

              <th>柔整</th>
              <th></th>
	      <th></th>
              <th></th>
              <th></th>
	      <th></th>
              <th>鍼灸</th>
              <th></th>
	      <th></th>
              <th></th>
              <th></th>
	      <th></th>
              <th>マッサージ</th>
              <th></th>
	      <th></th>
              <th></th>
              <th></th>
	      <th></th>
              <th>自賠責</th>
              <th></th>
	      <th></th>
              <th></th>
              <th></th>
	      <th></th>
              <th>労災</th>
              <th></th>
	      <th></th>
              <th></th>
	      <th></th>
              <th></th>
              <th>生活保護</th>
              <th></th>
	      <th></th>
	      <th></th>
              <th></th>
              <th></th>

              <th>継続率</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>

              <th>来店時間</th>
              <th></th>
              <th>来店日</th>
              <th></th>

              <th>性別</th>
              <th></th>
              <th>年代</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <th>--</th>
              <th>総合売上</th>
              <th>保険請求額</th>
              <th>保険負担金</th>
	      <th>自費施術売上</th>
              <th>物販売上</th>
              <th>自費総合売上</th>
              <th>自費施術回数</th>
              <th>物販数</th>
              <th>施術回数</th>
              <th>来院数</th>
              <th>純患数</th>
              <th>新患数</th>
              <th>完治者数</th>
              <th>施術時間</th>
              <th>自費客単価</th>
              <th>自費時間単価</th>
              <th>平均来院数</th>
              <th>新患割合</th>
              <th>既存割合</th>

              <th>請求額</th>
              <th>負担金</th>
	      <th>来院数</th>
	      <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
              <th>請求額</th>
              <th>負担金</th>
	      <th>来院数</th>
	      <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
              <th>請求額</th>
              <th>負担金</th>
	      <th>来院数</th>
	      <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
              <th>請求額</th>
              <th>負担金</th>
	      <th>来院数</th>
	      <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
              <th>請求額</th>
              <th>負担金</th>
	      <th>来院数</th>
	      <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>
              <th>請求額</th>
              <th>負担金</th>
	      <th>来院数</th>
	      <th>純患数</th>
<th>新患数</th>
<th>完治者数</th>

              <th>1回目人数</th>
              <th>1回目維持率</th>
              <th>2回目</th>
              <th>2回目維持率</th>
              <th>4回目</th>
              <th>4回目維持率</th>
              <th>8回目</th>
              <th>8回目維持率</th>
              <th>10回以上</th>
              <th>10回以上維持率</th>

              <th>午前</th>
              <th>午後</th>
              <th>平日</th>
              <th>休日</th>

              <th>男性</th>
              <th>女性</th>
              <th>19歳以下</th>
              <th>20~39歳</th>
              <th>40~64歳</th>
              <th>65~74歳</th>
              <th>75歳以上</th>
            </tr>
            ${ap}
          </table>
          `
        );

      });
      }
    })();
    (() => {
      let wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      };
      let workbook = {
        SheetNames: [],
        Sheets: {}
      };
      document.querySelectorAll('#staff_table_base table').forEach(function (currentValue, index) {
        let n = currentValue.getAttribute('data-sheet-name');
        if (!n) {n = 'Sheet' + index;}
        workbook.SheetNames.push(n);
        workbook.Sheets[n] = XLSX.utils.table_to_sheet(currentValue, wopts);
      });
      let wbout = XLSX.write(workbook, wopts);
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
      }
      saveAs(new Blob([s2ab(wbout)], {
        type: 'application/octet-stream'
      }), `medicalCRM担当者別帳票.xlsx`);
    })();
  });
  $(document).off('click','#rstbtn2').on('click','#rstbtn2',function() {
    let objs = data.data.data5;

    let ap = ``;
    objs = objs.filter(({reason_id}) => reason_id >= 0);
    objs.forEach((cell) => {
      ap +=
      `
      <tr>
        <th>${cell.reason_name}</th>
        <th>${cell.data_0}</th>
        <th>${cell.data_1}</th>
      </tr>
      `;
    });

    $('#table_vr').html(
      `
      <tr>
        <th>来店動機別</th>
        <th>${ps.str_date(`.`)}</th>
        <th>~</th>
        <th>${pe.str_date(`.`)}</th>
      </tr>
      <tr>
        <th>--</th>
        <th>来院数</th>
        <th>新患来院数</th>
      </tr>
      ${ap}
      `
    );
    (() => {
      let wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      };
      let workbook = {
        SheetNames: [],
        Sheets: {}
      };
      document.querySelectorAll('#vr_table_base table').forEach(function (currentValue, index) {
        let n = currentValue.getAttribute('data-sheet-name');
        if (!n) {n = 'Sheet' + index;}
        workbook.SheetNames.push(n);
        workbook.Sheets[n] = XLSX.utils.table_to_sheet(currentValue, wopts);
      });
      let wbout = XLSX.write(workbook, wopts);
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
      }
      saveAs(new Blob([s2ab(wbout)], {
        type: 'application/octet-stream'
      }), `medicalCRM来店動機別帳票.xlsx`);
    })();
  });
  $(document).off('click','#rstbtn3').on('click','#rstbtn3',function() {
    let objs = data.data.data8;

    let ap = ``;
    objs = objs.filter(({obj_id}) => obj_id >= 0);
    objs.forEach((cell) => {
      ap +=
      `
      <tr>
        <th>${cell.obj_name}</th>
        <th>${cell.data_0}</th>
        <th>${cell.data_1}</th>
        <th>${cell.data_2}</th>
      </tr>
      `;
    });

    $('#table_key').html(
      `
      <tr>
        <th>キーワード別</th>
        <th>${ps.str_date(`.`)}</th>
        <th>~</th>
        <th>${pe.str_date(`.`)}</th>
      </tr>
      <tr>
        <th>--</th>
        <th>自費売上</th>
        <th>施術回数</th>
        <th>新患数</th>
      </tr>
      ${ap}
      `
    );
    (() => {
      let wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      };
      let workbook = {
        SheetNames: [],
        Sheets: {}
      };
      document.querySelectorAll('#key_table_base table').forEach(function (currentValue, index) {
        let n = currentValue.getAttribute('data-sheet-name');
        if (!n) {n = 'Sheet' + index;}
        workbook.SheetNames.push(n);
        workbook.Sheets[n] = XLSX.utils.table_to_sheet(currentValue, wopts);
      });
      let wbout = XLSX.write(workbook, wopts);
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
      }
      saveAs(new Blob([s2ab(wbout)], {
        type: 'application/octet-stream'
      }), `medicalCRMキーワードメニュー別帳票.xlsx`);
    })();
  });
  $(document).off('click','#rstbtn4').on('click','#rstbtn4',function() {
    let objs = data.data.data9;

    let ap = ``;
    objs = objs.filter(({obj_id}) => obj_id >= 0);
    objs.forEach((cell) => {
      ap +=
      `
      <tr>
        <th>${cell.obj_name}</th>
        <th>${cell.data_0}</th>
        <th>${cell.data_1}</th>
        <th>${cell.data_2}</th>
      </tr>
      `;
    });

    $('#table_jihi').html(
      `
      <tr>
        <th>自費メニュー別</th>
        <th>${ps.str_date(`.`)}</th>
        <th>~</th>
        <th>${pe.str_date(`.`)}</th>
      </tr>
      <tr>
        <th>--</th>
        <th>自費売上</th>
        <th>施術回数</th>
        <th>新患数</th>
      </tr>
      ${ap}
      `
    );
    (() => {
      let wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      };
      let workbook = {
        SheetNames: [],
        Sheets: {}
      };
      document.querySelectorAll('#jihi_table_base table').forEach(function (currentValue, index) {
        let n = currentValue.getAttribute('data-sheet-name');
        if (!n) {n = 'Sheet' + index;}
        workbook.SheetNames.push(n);
        workbook.Sheets[n] = XLSX.utils.table_to_sheet(currentValue, wopts);
      });
      let wbout = XLSX.write(workbook, wopts);
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
      }
      saveAs(new Blob([s2ab(wbout)], {
        type: 'application/octet-stream'
      }), `medicalCRM自費メニュー別帳票.xlsx`);
    })();
  });
}
var query_function = async () => {
  let form = document.forms['query_form'];
  let pt = $('input[name="pt_"]:checked').prop('id').split('_')[1];
  let ps = form.elements['pi_s'].value;
  let pe = form.elements['pi_e'].value;
  let objs = $('#obj_select option:selected').prop('value');

  (() => {
    $('#setting_ios').prop('checked',false);
    $('#setting_indi').html(
      `
      <div class="cell inline"><i class="fas fa-cogs"></i></div>
      <div class="cell inline">${ptna[pt]}</div>
      <div class="cell inline">${ps.str_date(`.`)} - ${pe.str_date(`.`)}</div>
      <div class="cell cell_indi inline"><i class="fas fa-caret-down"></i></div>
      `
    );
  })();

  const sender_data = {
    pt:pt,
    ps:ps,
    pe:pe,
    objs:objs
  }

  $('#content_base').html(`<div class="loading_base inline"><i class="fad fa-spinner-third fa-spin"></i></div>`);
  let result_custom_field = await ajax_api_function("custom_field",sender_data);
  if (result_custom_field.dataExists) {
    desc_function(result_custom_field.data);
  } else {
    alert(`データ通信エラー:${result_custom_field.reason}`);
  }
}

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);

  $(document).ready(async function(){
    $('.left_bar_base a:eq(6) .cell').addClass('selected');

    $('#page_ttl_base').html(`<div class="icn inline"><i class="fas fa-file-excel"></i></div>帳票`);

    let clinics = await ajax_api_function("read_clinic_objs","");
    if (clinics.dataExists) {
      let option = ``,option_out = ``,all_option = ``;
      let objs = clinics.data;

      objs.forEach((cell,idx) => {
        let enabled = cell.enabled;
        if (enabled == 1) {
          option += `<option value="${cell.obj_id}">${cell.obj_name}</option>`;
        } else if (enabled == 0) {
          option_out += `<option value="${cell.obj_id}">${cell.obj_name}</option>`;
        }
        all_option += `${cell.obj_id}`;
        if (idx != objs.length - 1) all_option += `,`;
      });

      $('#obj_select').html(
        `
        <option value="${all_option}">全ての院</option>
        <optgroup label="稼働中">
          ${option}
        </optgroup>
        <optgroup label="休業中・閉店">
          ${option_out}
        </optgroup>
        `
      );

      const desc_init = async () => {
        await psln_setter(0);
        await psl_setter(0,"pi");
        await query_function();
      }
      desc_init();
    } else {
      alert(`データ通信エラー:${result.reason}`);
    }
  });
}
