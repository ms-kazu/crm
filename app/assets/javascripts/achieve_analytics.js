var user_name = getDOM('user_name').value;
var s_select = (getDOM(`s_select`).value).bool();
var p_select = (getDOM(`p_select`).value).bool();
var m_select = (getDOM(`m_select`).value).bool();

var sender_list_objs = {}
var sender_menus_objs = [];
var sender_menus_so = ["","","","",""];
var segment_objs = [
  {dataExists:false,data:{}},
  {dataExists:false,data:{}},
  {dataExists:false,data:{}},
  {dataExists:false,data:{}},
  {dataExists:false,data:{}},
  {dataExists:false,data:{}},
  {dataExists:false,data:{}},
  {dataExists:false,data:{}}
];

var desc_obj_page = () => {
  let cpt = getDOM(`cpt`).checked;
  let bt = $('input[name="segment_input_"]:checked').prop('id').split('_')[2];
  let pt = $('input[name="pt_"]:checked').prop('id').split('_')[1];
  let ps = getDOM(`pi_s`).value;
  let pe = getDOM(`pi_e`).value;
  let st = $('input[name="st_"]:checked').prop('id').split('_')[1];
  let cps = getDOM(`cpi_s`).value || "0000-00-00";
  let cpe = getDOM(`cpi_e`).value || "0000-00-00";
  let pa = period_map(ps,pe,pt);
  let cpa = period_map(cps,cpe,pt);

  let sid = $('#cmb_nt').prop('data-id').split('_')[1];

  let data = segment_objs[bt].data;

  $('#content_base').html(`<div class="loading_base inline"><i class="fad fa-spinner-third fa-spin"></i></div>`);

  if (bt == 0) {
    if (!data.data.data.exist_val()) {
      $('#content_base').html(`<div class="loading_base inline">データがありません。</div>`);
      return;
    }

    let data_length = data.data.data.length;
    let c_data_length = data.cdata.data.length;

    let datas = data.data.data;
    let c_datas = data.cdata.data;

    const desc_content_leveling = () => {
      $('#content_base').html(
        `
        <div class="section">
          <div class="section_title">
            売上と集客の概要
            <div class="icon inline">
              <i class="fas fa-question-circle help_tips" data-title="セルのクリック" data-help="各項目をクリックすると下の青帯セクションの値が更新されます。"></i>
            </div>
          </div>
          <div class="cell_btn_box" id="cell_btn_box"></div>
          <div class="cells_box">
            <div class="cell cell_2x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">トレンドを見る
                  <div class="icon inline">
                    <i class="fas fa-question-circle help_tips" data-title="平均成長率" data-help="単位期間ごとの平均の成長線です。この値は各変動に依存するので回帰線とは無相関な値になる場合があります。"></i>
                  </div>
                  <div class="icon inline">
                    <i class="fas fa-question-circle help_tips" data-title="回帰直線とは?" data-help="回帰直線とは、散布図において予定値を求める際に用いられる直線のことです。2組のデータの中心的な分布傾向を表すもので、最小二乗法と呼ばれる算術を用いて求められます。この直線を用いることにより、現在のトレンドの傾向を捉えることができます。"></i>
                  </div>
                </div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="trend_line" width="250" height="100"></canvas>
                    </div>
                    <div class="rows">
                      <div class="row">
                        <div class="row_title">
                          <span class="icon inline"><i class="fad fa-ball-pile"></i></span> 累計
                          <div class="rate_amount" id="trend_r_amount"></div>
                        </div>
                        <div class="content" id="trend_amount">
                        </div>
                      </div>
                      <div class="row">
                        <div class="row_title">
                          <span class="icon inline"><i class="fas fa-chart-area"></i></span> 平均成長率
                          <div class="rate_amount" id="trend_r_regression"></div>
                        </div>
                        <div class="content" id="trend_regression">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box cell_link">
                <div class="cell_title cell_title_r text_overflow">トレンドの積分
                  <div class="icon inline">
                    <i class="fas fa-question-circle help_tips" data-title="トレンドの高次元グラフ" data-help="このグラフはトレンド図表を高次元展開した蓄積グラフです。各項目が積分された関数が表示されています。このセクションで言う成長線とはトレンド図の回帰線の積分関数です。"></i>
                  </div>
                </div>
                <div class="content _integral_">
                  <div class="base">
                    <div class="switch_base">
                      <input type="radio" name="integral_input_" id="integral_input_0" checked>
                      <label for="integral_input_0">
                        <i class="fas fa-wave-square"></i> 成長率
                      </label>
                      <input type="radio" name="integral_input_" id="integral_input_1">
                      <label for="integral_input_1">
                        <i class="fas fa-signal"></i> 累積
                      </label>
                    </div>
                    <div class="graph_wrap">
                      <canvas id="integral_line" width="150" height="100"></canvas>
                    </div>
                    <div class="row">
                      <div class="row_title">
                        <span class="icon inline"><i class="fas fa-chart-area"></i></span> 回帰
                        <div class="rate_amount" id="trend_r_accel"></div>
                      </div>
                      <div class="content" id="trend_accel">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title cell_title_r text_overflow">目標達成状況</div>
                <div class="content _mission_">
                  <div class="base">
                    <div class="switch_base">
                      <input type="radio" name="mission_input_" id="mission_input_0" checked>
                      <label for="mission_input_0">
                        <i class="fas fa-cash-register"></i> 窓口売上
                      </label>
                      <input type="radio" name="mission_input_" id="mission_input_1">
                      <label for="mission_input_1">
                        <i class="fad fa-users"></i> 来院数
                      </label>
                    </div>
                    <div class="graph_wrap">
                      <canvas id="mission_line" width="200" height="100"></canvas>
                    </div>
                    <div class="pie_base">
                      <div class="graph_wrap">
                        <canvas id="mission_pie" width="100" height="100"></canvas>
                      </div>
                      <div class="mini_rows">
                        <div class="row">
                          <div class="row_title">
                            <span class="icon inline"><i class="fas fa-bullseye-pointer"></i></span> 目標達成率
                          </div>
                          <div class="content" id="mission_rate">--%</div>
                        </div>
                        <div class="row">
                          <div class="row_title">
                            <span class="icon inline"><i class="fas fa-flag"></i></span> 達成まであと
                          </div>
                          <div class="content" id="mission_left">--円</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">活動量は？</div>
                <div class="content _amount_box_">
                  <div class="base" id="cb_quantity"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">活動の効率は？</div>
                <div class="content _amount_box_">
                  <div class="base" id="cb_quality"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">売上のバランスは？</div>
                <div class="content _money_">
                  <div class="base">
                    <div class="bar_row">
                      <div class="graph" id="money_bb">
                        <div class="bar_base inline">
                        </div>
                      </div>
                      <div class="indi">
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_0 inline"><i class="fas fa-square"></i></span> 保険請求
                          </div>
                          <div class="content" id="money_data0">
                          </div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_1 inline"><i class="fas fa-square"></i></span> 保険負担
                          </div>
                          <div class="content" id="money_data1">
                          </div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_2 inline"><i class="fas fa-square"></i></span> 自費売上
                          </div>
                          <div class="content" id="money_data2">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">曜日別の窓口売上は？</div>
                <div class="content _week_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="week_line" width="250" height="100"></canvas>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">日</span></div>
                      <div class="amount" id="week_a_t0">--</div>
                      <div class="rate" id="week_r_t0">--%</div>
                      <div class="bar" id="week_b_t0"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">月</span></div>
                      <div class="amount" id="week_a_t1">--</div>
                      <div class="rate" id="week_r_t1">--%</div>
                      <div class="bar" id="week_b_t1"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">火</span></div>
                      <div class="amount" id="week_a_t2">--</div>
                      <div class="rate" id="week_r_t2">--%</div>
                      <div class="bar" id="week_b_t2"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">水</span></div>
                      <div class="amount" id="week_a_t3">--</div>
                      <div class="rate" id="week_r_t3">--%</div>
                      <div class="bar" id="week_b_t3"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">木</span></div>
                      <div class="amount" id="week_a_t4">--</div>
                      <div class="rate" id="week_r_t4">--%</div>
                      <div class="bar" id="week_b_t4"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">金</span></div>
                      <div class="amount" id="week_a_t5">--</div>
                      <div class="rate" id="week_r_t5">--%</div>
                      <div class="bar" id="week_b_t5"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">土</span></div>
                      <div class="amount" id="week_a_t6">--</div>
                      <div class="rate" id="week_r_t6">--%</div>
                      <div class="bar" id="week_b_t6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客の流入経路は？</div>
                <div class="content _source_">
                  <div class="base">
                    <div class="bar_row">
                      <div class="graph" id="source_bb">
                        <div class="bar_base inline">
                        </div>
                      </div>
                      <div class="indi">
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_0 inline"><i class="fas fa-square"></i></span> 完治
                          </div>
                          <div class="content" id="source_data0"></div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_1 inline"><i class="fas fa-square"></i></span> 既存
                          </div>
                          <div class="content" id="source_data1"></div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_2 inline"><i class="fas fa-square"></i></span> 新規
                          </div>
                          <div class="content" id="source_data2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客の属性は？</div>
                <div class="content _customer_">
                  <div class="base">
                    <div class="bar_row">
                      <div class="graph" id="customer_gender">
                        <div class="bar_base inline">
                        </div>
                      </div>
                      <div class="indi">
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_0 inline"><i class="fas fa-square"></i></span> 男性
                          </div>
                          <div class="content" id="customer_male">
                          </div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_1 inline"><i class="fas fa-square"></i></span> 女性
                          </div>
                          <div class="content" id="customer_female">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bar_row">
                      <div class="graph" id="customer_generation">
                        <div class="bar_base inline">
                        </div>
                      </div>
                      <div class="indi">
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_0 inline"><i class="fas fa-square"></i></span> 未成年
                          </div>
                          <div class="content" id="customer_age1">
                          </div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_1 inline"><i class="fas fa-square"></i></span> 成人
                          </div>
                          <div class="content" id="customer_age2">
                          </div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_2 inline"><i class="fas fa-square"></i></span> 高齢者
                          </div>
                          <div class="content" id="customer_age3">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">来店が多い時間帯は？</div>
                <div class="content _hour_">
                  <div class="base">
                    <div class="hour_graph" id="hour_graph_base">
                    </div>
                    <div class="week_indi" id="hour_week_indi"></div>
                    <div class="gradient_indi" id="hour_gradient_indi"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">全国比較
                  <div class="icon inline">
                    <i class="fas fa-question-circle help_tips" data-title="全国比較" data-help="このセクションでは全国他社店舗の平均と自社平均を比較できます。例えば、セグメントを店舗にすると1日1店舗の全国平均と比較できます。"></i>
                  </div>
                </div>
                <div class="content _appearance_">
                  <div class="base">
                    <div class="switch_base">
                      <input type="radio" name="appearance_input_" id="appearance_input_0" checked>
                      <label for="appearance_input_0">
                        <i class="fas fa-cash-register"></i> 窓口売上
                      </label>
                      <input type="radio" name="appearance_input_" id="appearance_input_1">
                      <label for="appearance_input_1">
                        <i class="fad fa-users"></i> 来院数
                      </label>
                    </div>
                    <div class="graph_wrap">
                      <canvas id="appearance_bar" width="250" height="100"></canvas>
                    </div>
                    <div class="row">
                      <div class="row_title">
                        <span class="icon inline"><i class="fas fa-abacus"></i></span> 平均との差
                      </div>
                      <div class="content" id="appearance_margin">
                        --円
                      </div>
                    </div>
                    <div class="row">
                      <div class="row_title">
                        <span class="icon inline"><i class="fas fa-chart-line"></i></span> 平均との比
                      </div>
                      <div class="content" id="appearance_rate">
                        --%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
      );
    }
    const desc_cells_btn = () => {
      var col_name = [
        "総合売上",
        "保険請求額",
        "窓口売上",
        "保険負担金",
        "自費売上",
        "施術回数",
        "来店数",
        "延べ純患数",
        "純患数",
        "新患数",
        "完治数",
        "稼働時間"
      ];
      var col_icon = [
        `<i class='fas fa-yen-sign'></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class='fas fa-cash-register'></i>`,
        `<i class='fas fa-hand-holding-heart'></i>`,
        `<i class='fas fa-hands-usd'></i>`,
        `<i class='fas fa-folder-open'></i>`,
        `<i class='fas fa-users'></i>`,
        `<i class="fad fa-users"></i>`,
        `<i class='fas fa-user-friends'></i>`,
        `<i class="fas fa-user-plus"></i>`,
        `<i class="fas fa-heartbeat"></i>`,
        `<i class='fas fa-history'></i>`
      ];

      let ap = ``;
      for (let i = 0;i < 12;i++) {
        let amount = datas.sum_val(`data_${i}`);

        if (!cpt) {
          ap +=
          `
          <input type="radio" name="cell_input_" id="cell_input_${i}">
          <label class="cell inline" for="cell_input_${i}">
            <div class="box">
              <div class="cell_title">
                <span class="icon inline">${col_icon[i]}</span> ${col_name[i]}
              </div>
              <div class="content">
                <div class="amount text_overflow">
                  ${amount.str_jp()}
                </div>
              </div>
            </div>
          </label>
          `;
        } else {
          let c_amount = c_datas.sum_val(`data_${i}`);
          let rate = amount.to_rate(c_amount).rate_str();

          ap +=
          `
          <input type="radio" name="cell_input_" id="cell_input_${i}">
          <label class="cell inline" for="cell_input_${i}">
            <div class="box">
              <div class="cell_title">
                <span class="icon inline">${col_icon[i]}</span> ${col_name[i]}
              </div>
              <div class="content">
                <div class="amount text_overflow">
                  ${amount.str_jp()}
                </div>
                <div class="c_amount text_overflow">
                  ${c_amount.str_jp()}
                </div>
                <div class="r_amount text_overflow">
                  ${rate}
                </div>
              </div>
            </div>
          </label>
          `;
        }
      }
      $('#cell_btn_box').html(ap);
    }
    const desc_dynamic_sections = (ct) => {
      (() => {
        $(`#cell_input_${ct}`).prop('checked',true);
        $('.cell_link').addClass('select_shadow');
        setTimeout(() => {$('.cell_link').removeClass('select_shadow');},1000);
      })();

      const desc_trend_section = () => {
        let total = datas.sum_val(`data_${ct}`);
        let c_total = c_datas.sum_val(`data_${ct}`);
        let ave = total.to_Perate(pa.length);

        let tpl = [];

        let trend_data_arr = [];
        let trend_c_data_arr = [];
        let trend_regression_data = [];
        let trend_c_regression_data = [];

        let integral_data_arr = [];
        let integral_c_data_arr = [];
        let integral_ave_arr = [];
        let integral_rate_arr = [];
        let integral_c_rate_arr = [];
        let integral_regression_data = [];
        let integral_c_regression_data = [];
        let pointRadius_arr = [];

        let a = 0;
        let c_a = 0;

        const desc_leveling = () => {
          let sx = 0,sy = 0,sxy = 0,sxx = 0;
          let c_sx = 0,c_sy = 0,c_sxy = 0,c_sxx = 0;

          pa.forEach((label,idx) => {
            tpl.push(convert_pl(label,idx,pt));
            integral_ave_arr.push(ave * (idx + 1));
            idx == pa.length - 1 ? pointRadius_arr.push(5) : pointRadius_arr.push(0);

            let result = datas.filter(({period}) => period == label);
            let amount = result.sum_val(`data_${ct}`);

            trend_data_arr.push(amount);

            (() => {
              let a = amount.to_point(trend_data_arr[idx - 1]);
              if (isNaN(a)) a = 0;
              integral_rate_arr.push(a);
            })();

            idx == 0
              ? integral_data_arr.push(amount)
              : integral_data_arr.push(amount + integral_data_arr[idx - 1]);

            sx += idx + 1;
            sy += amount;
            sxy += (idx + 1) * amount;
            sxx += (idx + 1) * (idx + 1);

            if (cpt) {
              let c_label = cpa[idx];
              let c_result = c_datas.filter(({period}) => period == c_label);
              let c_amount = c_result.sum_val(`data_${ct}`) || 0;

              trend_c_data_arr.push(c_amount);

              (() => {
                let c_a = c_amount.to_point(trend_c_data_arr[idx - 1])
                if (isNaN(c_a)) c_a = 0;
                integral_c_rate_arr.push(c_a);
              })();

              idx == 0
                ? integral_c_data_arr.push(c_amount)
                : integral_c_data_arr.push(c_amount + integral_c_data_arr[idx - 1]);

              c_sx += idx + 1;
              c_sy += c_amount;
              c_sxy += (idx + 1) * c_amount;
              c_sxx += (idx + 1) * (idx + 1);
            }
          });

          const calc_regression = () => {
            let n = pa.length;
            let y_ave = sy / n;
            let x_ave = sx / n;
            let x_multi = sxx;
            let Sxx = x_multi - n * x_ave * x_ave;
            let Sxy = sxy - n * y_ave * x_ave;
            a = Sxy / Sxx;
            let b = y_ave - a * x_ave;

            pa.forEach((cell,idx) =>  {
              let amount = b + a*idx;
              trend_regression_data.push(amount);
              let sum = integral_regression_data[idx - 1];
              idx == 0
                ? integral_regression_data.push(amount)
                : integral_regression_data.push(amount + sum);
            });

            if (cpt) {
              let c_n = cpa.length;
              let c_y_ave = c_sy / c_n;
              let c_x_ave = c_sx / c_n;
              let c_x_multi = c_sxx;
              let c_Sxx = c_x_multi - c_n * c_x_ave * c_x_ave;
              let c_Sxy = c_sxy - c_n * c_y_ave * c_x_ave;
              c_a = c_Sxy / c_Sxx;
              let c_b = c_y_ave - c_a * c_x_ave;

              cpa.forEach((cell,idx) =>  {
                let amount = c_b + c_a*idx;
                let sum = integral_c_regression_data[idx - 1];
                trend_c_regression_data.push(amount);
                idx == 0
                  ? integral_c_regression_data.push(amount)
                  : integral_c_regression_data.push(amount + sum);
              });
            }
          }
          calc_regression();
        }
        const desc_trend = () => {
          const desc_line = () => {
            let graph_data = [{
              type:"LineWithLine",
              label:"当期",
              data:trend_data_arr,
              backgroundColor:`rgba(54,100,180,.05)`,
              borderColor:"rgba(54,100,180,1)",
              borderWidth:1.5,
              pointRadius:5,
              pointBackgroundColor:"#fff",
              fill:true,
              yAxisID: "y-axis-0",
              cubicInterpolationMode: 'monotone',
              lineTension: 0
            },{
              type:"LineWithLine",
              label:"回帰線",
              data:trend_regression_data,
              backgroundColor:`rgba(66,113,244,.05)`,
              borderColor:`rgba(66,113,244,1)`,
              pointRadius:0,
              borderWidth:1,
              fill:false,
              yAxisID: "y-axis-0",
              cubicInterpolationMode: 'monotone',
              lineTension : 0
            }];
            if (cpt) {
              graph_data.push({
                type:"LineWithLine",
                label:"比較",
                data:trend_c_data_arr,
                backgroundColor:"#fff",
                borderColor:"rgba(242,100,100,1)",
                borderWidth:1.5,
                pointRadius:5,
                fill:false,
                yAxisID: "y-axis-0",
                cubicInterpolationMode: 'monotone',
                lineTension: 0
              },{
                type:"LineWithLine",
                label:"比較回帰線",
                data:trend_c_regression_data,
                backgroundColor:`rgba(255,165,0,.05)`,
                borderColor:`rgba(255,165,0,1)`,
                pointRadius:0,
                borderWidth:1,
                fill:false,
                yAxisID: "y-axis-0",
                cubicInterpolationMode: 'monotone',
                lineTension : 0
              })
            }
            let graph_option = {
              maintainAspectRatio:true,
              responsive: true,
              legend:{
                labels:{
                  fontSize:10,
                  boxWidth:24
                }
              },
              title: {display:false,fontSize:12,text:"",},
              elements: {
                point:{radius:0}
              },
              scales: {
                yAxes: [{
                  id: "y-axis-0",
                  type: "linear",
                  position: "left",
                  gridLines: {
                    display:true,
                    drawBorder: false,
                    zeroLineColor:"#eee",
                    color:"#eee"
                  },
                  ticks: {
                    min:0,
                    autoSkip: true,
                    fontSize:8,
                    maxTicksLimit:4,
                    callback: function(label, index, labels) {
                      return label.str_jp();
                    }
                  },
                }],
                xAxes: [{
                  barPercentage: .9,
                  categoryPercentage:1,
                  ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    min:0,
                    fontSize:8,
                    autoSkip: true,
                    maxTicksLimit:8,
                  },
                  gridLines: {
                    display:false,
                    drawBorder: false,
                  },
                  scaleLabel: {
                    display: false,
                  }
                }]
              },
              tooltips: {
                bodySpacing:5,
                titleFontSize:12.5,
                bodyFontSize:15,
                intersect:false,
                axis:'x',
                mode:'index',
                callbacks: {
                  title:function(t,d) {
                    let index = t[0].index;
                    let period = pa[index];
                    period = period == undefined ? `0000-00-00` : period;
                    return `${period.str_date(`.`)}`;
                  },
                  label:function(t,d) {
                    let index = t.index;
                    let idx = t.datasetIndex;
                    if (idx == 1 || idx == 3) {return;}
                    let amount = t.yLabel;
                    let ar = ["当期","","比較",""];
                    return `${ar[idx]} ${amount.toLocaleString()}`;
                  }
                }
              }
            }
            trend_line.data = {
              labels:tpl,
              datasets:graph_data
            };
            trend_line.options = graph_option;
            trend_line.update();
          }
          const desc_details = () => {
            let par = ["日","週","月"];
            let reg_rate = (integral_rate_arr.sum_val(``) / integral_rate_arr.length).to_rate(1);
            if (!cpt) {
              $('#trend_amount').html(`<div class="amount">${total.toLocaleString()}</div>`);
              $('#trend_regression').html(`<div class="amount">${reg_rate.rate_str()}<span class="indi">/${par[pt]}</span></div>`);
            } else {
              let reg_c_rate = (integral_c_rate_arr.sum_val(``) / integral_c_rate_arr.length).to_rate(1);
              let amount_rate = total.to_rate(c_total).rate_str();

              let c_rate =  (reg_rate - reg_c_rate).margin_str(``);

              $('#trend_amount').html(
                `
                <div class="amount">${total.toLocaleString()}</div>
                <div class="c_amount">${c_total.toLocaleString()}</div>
                `
              );
              $('#trend_regression').html(
                `
                <div class="amount">${reg_rate.rate_str()}<span class="indi">/${par[pt]}</span></div>
                <div class="c_amount">${reg_c_rate.rate_str()}<span class="indi">/${par[pt]}</span></div>
                `
              );
              $('#trend_r_amount').html(amount_rate);
              $('#trend_r_regression').html(c_rate);
            }
          }

          desc_line();
          desc_details();
        }
        const desc_integral = () => {
          const desc_line = (mbt) => {
            let graph_data;
            let graph_option = {
              maintainAspectRatio:true,
              legend:{
                labels:{
                  fontSize:10,
                }
              },
              title: {display:false,fontSize:12,text:"",},
              elements: {
                point:{radius:0}
              },
              responsive: true,
              scales: {
                yAxes: [{
                  id: "y-axis-0",
                  type: "linear",
                  position: "left",
                  gridLines: {
                    display:true,
                    drawBorder: false,
                    zeroLineColor:"#eee",
                    color:"#eee"
                  },
                  ticks: {
                    min:0,
                    autoSkip: true,
                    fontSize:8,
                    maxTicksLimit:5,
                    callback: function(label, index, labels) {
                      return label.str_jp();
                    }
                  },
                }],
                xAxes: [{
                  barPercentage: .9,
                  categoryPercentage:1,
                  ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    fontSize:8,
                    autoSkip: true,
                    maxTicksLimit:5,
                  },
                  gridLines: {
                    display:false,
                    drawBorder: false,
                  },
                  scaleLabel: {
                    display: false,
                  }
                }]
              },
              tooltips: {
                bodySpacing:5,
                titleFontSize:12.5,
                bodyFontSize:15,
                intersect:false,
                axis:'x',
                mode:'index',
                callbacks: {
                  title:function(t,d) {
                    let index = t[0].index;
                    let period = pa[index];
                    period = period == undefined ? `0000-00-00` : period;
                    let week = new Date(period).getDay();
                    return `${period} (${wna[week]})`;
                  },
                  label:function(t,d) {
                    let index = t.index;
                    let idx = t.datasetIndex;
                    let amount = t.yLabel;
                    let ar = [["当期","平均","比較"],["当期","比較"]];
                    return `${ar[mbt][idx]} ${amount.toLocaleString()}`;
                  }
                }
              }
            }
            if (mbt == 0) {
              graph_data = [{
                type:"LineWithLine",
                label:"成長線",
                data:integral_regression_data,
                backgroundColor:`rgba(66,113,244,.05)`,
                borderColor:`rgba(66,113,244,1)`,
                borderWidth:1.5,
                fill:false,
                yAxisID: "y-axis-0",
                cubicInterpolationMode: 'monotone',
                lineTension : 0
              },{
                type:"LineWithLine",
                label:"平均線",
                data:integral_ave_arr,
                backgroundColor:"#fff",
                borderColor:`#bbb`,
                borderWidth:1,
                fill:false,
                yAxisID: "y-axis-0",
                cubicInterpolationMode: 'monotone',
                lineTension : 0
              }];
              if (cpt) {
                graph_data.push({
                  type:"LineWithLine",
                  label:"比較成長線",
                  data:integral_c_regression_data,
                  backgroundColor:`rgba(255,165,0,.05)`,
                  borderColor:`rgba(255,165,0,1)`,
                  borderWidth:1.5,
                  fill:false,
                  yAxisID: "y-axis-0",
                  cubicInterpolationMode: 'monotone',
                  lineTension : 0
                });
              }
            } else {
              graph_data = [{
                type:"LineWithLine",
                data:integral_data_arr,
                label:"累積値",
                backgroundColor:`rgba(54,183,235,.05)`,
                borderColor:"#36b7eb",
                borderWidth: "2",
                yAxisID: "y-axis-0",
                pointBackgroundColor:"#fff",
                fill:true,
                cubicInterpolationMode: 'monotone',
                lineTension : 0,
                pointRadius:pointRadius_arr
              }];
              if (cpt) {
                graph_data.push({
                  type:"LineWithLine",
                  label:"比較",
                  data:integral_c_data_arr,
                  backgroundColor:"#fff",
                  borderColor:"rgba(242,100,100,1)",
                  borderWidth:1,
                  fill:false,
                  yAxisID: "y-axis-0",
                  cubicInterpolationMode: 'monotone',
                  lineTension: 0,
                  pointRadius:pointRadius_arr
                });
              }
            }
            integral_line.data = {
              labels:tpl,
              datasets:graph_data
            };
            integral_line.options = graph_option;
            integral_line.update();
          }
          const desc_details = () => {
            let par = ["日","週","月"];
            let lean = a.margin_str(``);
            let c_lean = c_a.margin_str(``);

            if (!cpt) {
              $('#trend_accel').html(`<div class="amount">${lean}<span class="indi">/${par[pt]}</span></div>`);
            } else {
              let rate = total.to_rate(c_total).rate_str();
              let r_rate = (a - c_a).margin_str(``);

              $('#trend_accel').html(
                `
                <div class="amount">${lean}<span class="indi">/${par[pt]}</span></div>
                <div class="c_amount">${c_lean}<span class="indi">/${par[pt]}</span></div>
                `
              );
              $('#trend_r_accel').html(r_rate);
            }
          }

          $(document).off('click','input[name="integral_input_"]').on('click','input[name="integral_input_"]',function() {
            let index = $('input[name="integral_input_"]').index(this);
            desc_line(index);
          });
          $('#integral_input_0').prop('checked',true);
          desc_line(0);
          desc_details();
        }

        desc_leveling();
        desc_trend();
        desc_integral();
      }
      const desc_volume = () => {
        let vrna = ["最小値","中央値","平均","最大値"];
        let vria = [
          `<i class="fas fa-arrow-to-bottom"></i>`,
          `<i class="fad fa-ellipsis-h"></i>`,
          `<i class="fad fa-ellipsis-v"></i>`,
          `<i class="fas fa-arrow-to-top"></i>`
        ];

        let total = datas.sum_val(`data_${ct}`);
        let ave = total.to_Perate(data_length);
        let median = datas.median_val(`data_${ct}`);
        let min = datas.min_val(`data_${ct}`);
        let max = datas.max_val(`data_${ct}`);

        let da = [min,median,ave,max];


        let c_total = c_datas.sum_val(`data_${ct}`);
        let c_ave = c_total.to_devide(c_data_length);
        let c_median = c_datas.median_val(`data_${ct}`);
        let c_min = c_datas.min_val(`data_${ct}`);
        let c_max = c_datas.max_val(`data_${ct}`);

        let cda = [c_min,c_median,c_ave,c_max];

        let ap = ``;
        for (let i = 0;i < 4;i++) {
          if (!cpt) {
            ap +=
            `
            <div class="row">
              <div class="row_title">
                <span class="icon inline">${vria[i]}</span> ${vrna[i]}
              </div>
              <div class="content">
                <div class="amount">${da[i].toLocaleString()}</div>
              </div>
            </div>
            `;
          } else {
            let rate = da[i].to_rate(cda[i]).rate_str();
            ap +=
            `
            <div class="row">
              <div class="row_title">
                <span class="icon inline">${vria[i]}</span> ${vrna[i]}
                <div class="rate_amount">${rate}</div>
              </div>
              <div class="content">
                <div class="amount">${da[i].toLocaleString()}</div>
                <div class="c_amount">${cda[i].toLocaleString()}</div>
              </div>
            </div>
            `;
          }
        }
        $('#cb_quantity').html(ap);
      }
      const desc_effect = () => {
        let vrna = ["1来院あたり(客単価)","1顧客あたり(LTV)","1メニューあたり","1時間あたり"];
        let vria = [
          `<i class="fas fa-users"></i>`,
          `<i class="fas fa-user"></i>`,
          `<i class="fas fa-file-alt"></i>`,
          `<i class="fas fa-clock"></i>`
        ];

        let total = datas.sum_val(`data_${ct}`);
        let menu = datas.sum_val(`data_5`);
        let count = datas.sum_val(`data_6`);
        let user = datas.sum_val(`data_8`);
        let hour = datas.sum_val(`data_11`);

        let cup = total.to_Perate(count);
        let uup = total.to_Perate(user);
        let mup = total.to_Perate(menu);
        let hup = total.to_Perate(hour);

        let da = [cup,uup,mup,hup];

        let c_total = c_datas.sum_val(`data_${ct}`);
        let c_menu = c_datas.sum_val(`data_5`);
        let c_count = c_datas.sum_val(`data_6`);
        let c_user = c_datas.sum_val(`data_8`);
        let c_hour = c_datas.sum_val(`data_11`);

        let c_cup = c_total.to_devide(c_count);
        let c_uup = c_total.to_devide(c_user);
        let c_mup = c_total.to_devide(c_menu);
        let c_hup = c_total.to_devide(c_hour);

        let cda = [c_cup,c_uup,c_mup,c_hup];

        let ap = ``;
        for (let i = 0;i < 4;i++) {
          if (!cpt) {
            ap +=
            `
            <div class="row">
              <div class="row_title">
                <span class="icon inline">${vria[i]}</span> ${vrna[i]}
              </div>
              <div class="content">
                <div class="amount">${da[i].toLocaleString()}</div>
              </div>
            </div>
            `;
          } else {
            let rate = da[i].to_rate(cda[i]).rate_str();
            ap +=
            `
            <div class="row">
              <div class="row_title">
                <span class="icon inline">${vria[i]}</span> ${vrna[i]}
                <div class="rate_amount">${rate}</div>
              </div>
              <div class="content">
                <div class="amount">${da[i].toLocaleString()}</div>
                <div class="c_amount">${cda[i].toLocaleString()}</div>
              </div>
            </div>
            `;
          }
        }
        $('#cb_quality').html(ap);
      }

      desc_trend_section();
      desc_volume();
      desc_effect();
    }
    const desc_static_sections = () => {
      const desc_mission_section = () => {
        let mcia = [2,6];
        let mcna = ["w_a","c_a"];
        let mcda = ["円","人"];
        let missions = data.data.mission;

        const section_content = (mbt) => {
          let
            tpl = [],
            pie_data = [0,0],
            line_amount_data = [],
            line_mission_data = [],
            line_amount_step = 0,
            line_mission_step = 0,
            pointRadius = []
          ;

          const desc_leveling = () => {
            pa.forEach((label,idx) => {
              tpl.push(convert_pl(label,idx,pt));

              let r_a = datas.filter(({period}) => period == label);
              let r_m = missions.filter(({period}) => period == label);

              let amount = r_a.sum_val(`data_${mcia[mbt]}`);
              let mission = r_m.sum_val(mcna[mbt]);

              if (amount - mission >= 0) {
                pie_data[0] += 1;
              } else {
                pie_data[1] += 1;
              }

              line_amount_step += amount;
              line_mission_step += mission;
              line_amount_data.push(line_amount_step);
              line_mission_data.push(line_mission_step);

              idx == pa.length - 1 ? pointRadius.push(5) : pointRadius.push(0);

            });
          }
          const desc_line = () => {
            let graph_data = [{
              type:"line",
              data:line_amount_data,
              backgroundColor:`rgba(54,100,180,.1)`,
              borderColor:`rgba(54,100,180,1)`,
              borderWidth: "2",
              yAxisID: "y-axis-0",
              pointBackgroundColor:"#fff",
              fill:true,
              cubicInterpolationMode: 'monotone',
              lineTension : 0,
              pointRadius:pointRadius
            },{
              type:"line",
              data:line_mission_data,
              backgroundColor:`#f4f4f4`,
              borderColor:"rgba(0,0,0,0)",
              borderWidth: "1",
              yAxisID: "y-axis-0",
              fill: true,
              cubicInterpolationMode: 'monotone',
              lineTension : 0
            }];
            let graph_option = {
              maintainAspectRatio:true,
              legend:{display:false},
              title: {display:false,fontSize:12,text:"",},
              elements: {
                point:{radius:0}
              },
              responsive: true,
              scales: {
                yAxes: [{
                  id: "y-axis-0",
                  type: "linear",
                  position: "left",
                  gridLines: {
                    display:false,
                    drawBorder: false,
                    zeroLineColor:"#333",
                    color:"#eee"
                  },
                  ticks: {
                    min:0,
                    display:false,
                    autoSkip: true,
                  },
                }],
                xAxes: [{
                  barPercentage: .9,
                  categoryPercentage:1,
                  ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    fontSize:8,
                    autoSkip: true,
                    maxTicksLimit:5,
                  },
                  gridLines: {
                    display:false,
                    drawBorder: false,
                  },
                  scaleLabel: {
                    display: false,
                  }
                }]
              },
              tooltips: {
                bodySpacing:5,
                titleFontSize:12.5,
                bodyFontSize:15,
                intersect:false,
                axis:'x',
                mode:'index',
                callbacks: {
                  title:function(t,d) {
                    let index = t[0].index;
                    let period = pa[index] || `0000-00-00`;

                    let ar = [0,1,1];
                    return `${period.str_date(`.`)}時点の評価額`;
                  },
                  label:function(t,d) {
                    let index = t.index;
                    let idx = t.datasetIndex;
                    if (idx == 1) {return;}
                    let amount = line_amount_data[index];
                    let mission = line_mission_data[index];

                    let margin = amount - mission;
                    let margin_s = margin >= 0 ? `+${margin.toLocaleString()}${mcda[mbt]}` : `${margin.toLocaleString()}${mcda[mbt]}`;
                    return margin_s
                  }
                }
              }
            }
            mission_line.data = {labels:tpl,datasets:graph_data};
            mission_line.options = graph_option;
            mission_line.update();
          }
          const desc_pie = () => {
            let graph_plugin = {
              afterDatasetsDraw: function (chart, easing) {
                var ctx = chart.ctx;
                chart.data.datasets.forEach(function (dataset, i) {
                  var meta = chart.getDatasetMeta(i);
                  if (!meta.hidden) {
                    meta.data.forEach(function (element, index) {
                      ctx.fillStyle = "white";
                      var fontSize = 8;
                      var fontStyle = 'normal';
                      var fontFamily = 'Helvetica Neue';
                      ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                      let amount = pie_data[index];
                      var dataString =
                      amount > 0
                      ? [`${amount}回`]
                      : [``];
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
                      var padding = 5;
                      var position = element.tooltipPosition();
                      ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                    });
                  }
                });
              }
            }
            let graph_data = [{
              data:pie_data,
              backgroundColor:["rgba(54,100,180,.75)","rgba(242,100,100,.75)"],
              borderColor:"",
              borderWidth:0,
            }];
            let graph_option = {
              maintainAspectRatio: false,
              responsive: true,
              cutoutPercentage:0,
              title: {display:false,fontSize:12,fontStyle:500,text: ''},
              pieceLabel: {render: 'label',position: 'outside'},
              tooltips:{
                callbacks: {
                  title:function(t,d) {return;},
                  label: function(t,d) {
                    let index = t.index;
                    let nar = ["達成","未達"];
                    return `${nar[index]} : ${pie_data[index]}回`;
                  }
                }
              }
            }
            mission_pie.data = {
              labels:"",
              datasets:graph_data,
            };
            mission_pie.config.plugins = [graph_plugin];
            mission_pie.options = graph_option;
            mission_pie.update();
          }
          const desc_details = () => {
            let amount = datas.sum_val(`data_${mcia[mbt]}`);
            let mission = missions.sum_val(mcna[mbt]);
            let rate = amount.to_perate(mission).perate_str();
            let margin = mission - amount;
            margin = margin <= 0 ? 0 : margin.toLocaleString();

            $('#mission_rate').html(rate);
            $('#mission_left').html(`${margin}${mcda[mbt]}`);
          }

          desc_leveling();
          desc_line();
          desc_pie();
          desc_details();
        }
        $(document).off('input',`input[name="mission_input_"]`).on('input','input[name="mission_input_"]',function() {
          let index = $('input[name="mission_input_"]').index(this);
          section_content(index);
        });
        section_content(0);
      }
      const desc_money_section = () => {
        let objs = [
          datas.sum_val(`data_0`),
          datas.sum_val(`data_1`),
          datas.sum_val(`data_3`),
          datas.sum_val(`data_4`)
        ];
        let c_objs = [
          c_datas.sum_val(`data_0`),
          c_datas.sum_val(`data_1`),
          c_datas.sum_val(`data_3`),
          c_datas.sum_val(`data_4`)
        ];

        const desc_money = () => {
          let data0 = objs[0];
          let data1 = objs[1];
          let data2 = objs[2];
          let data3 = objs[3];

          let perate_data1 = data1.to_perate(data0);
          let perate_data2 = data2.to_perate(data0);
          let perate_data3 = data3.to_perate(data0);

          if (!cpt) {
            $('#money_bb').html(
              `
              <div class="bar_base inline">
                <div class="bb" style="height:100%;">
                  <div class="bar bar_0" style="height:${perate_data1}%;"></div>
                  <div class="bar bar_1" style="height:${perate_data2}%;"></div>
                  <div class="bar bar_2" style="height:${perate_data3}%;"></div>
                </div>
              </div>
              `
            );
            $('#money_data0').html(`
              <div class="amount text_overflow">${data1.str_jp()}</div>
              <div class="rate text_overflow">${perate_data1}%</div>
            `);
            $('#money_data1').html(`
              <div class="amount text_overflow">${data2.str_jp()}</div>
              <div class="rate text_overflow">${perate_data2}%</div>
            `);
            $('#money_data2').html(`
              <div class="amount text_overflow">${data3.str_jp()}</div>
              <div class="rate text_overflow">${perate_data3}%</div>
            `);
          } else {
            let c_data0 = c_objs[0];
            let c_data1 = c_objs[1];
            let c_data2 = c_objs[2];
            let c_data3 = c_objs[3];

            let max = Math.max.apply(null,[data0,c_data0].map(function(o){return o;}));

            let rate_total = data0.to_perate(max);
            let rate_c_total = c_data0.to_perate(max);

            let perate_c_data1 = c_data1.to_perate(c_data0);
            let perate_c_data2 = c_data2.to_perate(c_data0);
            let perate_c_data3 = c_data3.to_perate(c_data0);

            let rate_data1 = data1.to_rate(c_data1).rate_str();
            let margin_data1 = (data1 - c_data1).margin_str(``);
            let rate_data2 = data2.to_rate(c_data2).rate_str();
            let margin_data2 = (data2 - c_data2).margin_str(``);
            let rate_data3 = data3.to_rate(c_data3).rate_str();
            let margin_data3 = (data3 - c_data3).margin_str(``);

            $('#money_bb').html(`
              <div class="bar_base inline" data-title="比較">
                <div class="bb" style="height:${rate_c_total}%;">
                  <div class="bar bar_0" style="height:${perate_c_data1}%;"></div>
                  <div class="bar bar_1" style="height:${perate_c_data2}%;"></div>
                  <div class="bar bar_2" style="height:${perate_c_data3}%;"></div>
                </div>
              </div>
              <div class="bar_base inline" data-title="">
                <div class="bb" style="height:${rate_total}%;">
                  <div class="bar bar_0" style="height:${perate_data1}%;"></div>
                  <div class="bar bar_1" style="height:${perate_data2}%;"></div>
                  <div class="bar bar_2" style="height:${perate_data3}%;"></div>
                </div>
              </div>
            `);
            $('#money_data0').html(`
              <div class="amount text_overflow">${margin_data1}</div>
              <div class="rate text_overflow">${rate_data1}</div>
            `);
            $('#money_data1').html(`
              <div class="amount text_overflow">${margin_data2}</div>
              <div class="rate text_overflow">${rate_data2}</div>
            `);
            $('#money_data2').html(`
              <div class="amount text_overflow">${margin_data3}</div>
              <div class="rate text_overflow">${rate_data3}</div>
            `);
          }

        }
        desc_money();
      }
      const desc_week_section = () => {
        let week_pa = period_map(ps,pe,1);
        let day_pa = period_map(ps,pe,0);
        let first_day_week = new Date(ps).getDay();
        let last_day_week = new Date(pe).getDay();

        let colorar = [
          "rgb(242,100,100)",
          "rgba(54,183,235,1)",
          "rgba(54,183,235,1)",
          "rgba(54,183,235,.66)",
          "rgba(54,183,235,.66)",
          "rgba(54,183,235,.33)",
          "rgb(18,83,164)"
        ];
        let dashar = ["","","borderDash: [5,2],","","borderDash: [5,2],","",""];

        let tpl = week_pa.map((label,idx) => {return `${idx + 1 - week_pa.length}週`;});

        let w_data0 = [],w_data1 = [],w_data2 = [],w_data3 = [],w_data4 = [],w_data5 = [],w_data6 = [],data_arr = [];

        for (let i = 0;i < 7;i++) {
          if (i < first_day_week) {
            eval(`w_data${i}.push(null)`);
          }
        }
        day_pa.forEach((label) => {
          let result = data.data.week.filter(({period}) => period == label);
          let amount = result.sum_val(`data_0`);
          let week = new Date(label).getDay();
          eval(`w_data${week}.push(${amount})`);
        });

        const desc_leveling = () => {
          for (let i = 0;i < 7;i++) {
            let t_w_ = i == new Date().getDay() ? false : true;
            eval(
              `
              data_arr.push({
                label:"${wna[i]}",
                type:"line",
                data:w_data${i},
                backgroundColor:"rgba(0,0,0,0)",
                pointBackgroundColor:"#fff",
                ${dashar[i]}
                borderColor:"${colorar[i]}",
                borderWidth: "1.5",
                fill: true,
                hidden:t_w_,
                lineTension : 0
              });
              `
            );
          }
        }
        const desc_line = () => {
          let graph_data = data_arr;
          let graph_option = {
            maintainAspectRatio: false,
            title: {display:false,fontSize:12,text:"",},
            legend:{
              labels:{
                fontSize:10,
                boxWidth:20
              }
            },
            elements: {point:{radius:0}},
            responsive: true,
            scales: {
              yAxes: [{
                id: "y-axis-0",
                type: "linear",
                position: "left",
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit: 3,
                  min:0,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              }],
              xAxes: [{
                barPercentage:.9,
                categoryPercentage:1,
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  fontSize:8,
                  autoSkip: true,
                  maxTicksLimit:8,
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                }
              }]
            },
            tooltips: {
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              axis:'x',
              mode:'index',
              // intersect:false,
              callbacks: {
                label:function(t,d) {
                  let index = t.datasetIndex;
                  let name = `${wna[index]}曜日`;
                  let amount = t.yLabel;
                  return `${name} : ¥${amount.toLocaleString()}`;
                }
              }
            }
          }
          week_line.data = {
            labels:tpl,
            datasets:graph_data
          };
          week_line.options = graph_option;
          week_line.update();

        }
        const desc_details = () => {
          let total = data.data.week.sum_val(`data_0`);

          let data0 = w_data0.sum_val(``);
          let data1 = w_data1.sum_val(``);
          let data2 = w_data2.sum_val(``);
          let data3 = w_data3.sum_val(``);
          let data4 = w_data4.sum_val(``);
          let data5 = w_data5.sum_val(``);
          let data6 = w_data6.sum_val(``);

          let rate0 = data0.to_perate(total);
          let rate1 = data1.to_perate(total);
          let rate2 = data2.to_perate(total);
          let rate3 = data3.to_perate(total);
          let rate4 = data4.to_perate(total);
          let rate5 = data5.to_perate(total);
          let rate6 = data6.to_perate(total);

          $('#week_a_t0').html(data0.str_jp());
          $('#week_a_t1').html(data1.str_jp());
          $('#week_a_t2').html(data2.str_jp());
          $('#week_a_t3').html(data3.str_jp());
          $('#week_a_t4').html(data4.str_jp());
          $('#week_a_t5').html(data5.str_jp());
          $('#week_a_t6').html(data6.str_jp());

          $('#week_r_t0').html(`${rate0}%`);
          $('#week_r_t1').html(`${rate1}%`);
          $('#week_r_t2').html(`${rate2}%`);
          $('#week_r_t3').html(`${rate3}%`);
          $('#week_r_t4').html(`${rate4}%`);
          $('#week_r_t5').html(`${rate5}%`);
          $('#week_r_t6').html(`${rate6}%`);

          $('#week_b_t0').css('width',`${rate0}%`);
          $('#week_b_t1').css('width',`${rate1}%`);
          $('#week_b_t2').css('width',`${rate2}%`);
          $('#week_b_t3').css('width',`${rate3}%`);
          $('#week_b_t4').css('width',`${rate4}%`);
          $('#week_b_t5').css('width',`${rate5}%`);
          $('#week_b_t6').css('width',`${rate6}%`);
        }

        desc_leveling();
        desc_line();
        desc_details();
      }
      const desc_source_section = () => {
        let objs = [
          datas.sum_val(`data_6`),
          datas.sum_val(`data_10`),
          datas.sum_val(`data_6`) - datas.sum_val(`data_10`) - datas.sum_val(`data_9`),
          datas.sum_val(`data_9`)
        ];
        let c_objs = [
          c_datas.sum_val(`data_6`),
          c_datas.sum_val(`data_10`),
          c_datas.sum_val(`data_6`) - c_datas.sum_val(`data_10`) - c_datas.sum_val(`data_9`),
          c_datas.sum_val(`data_9`)
        ];

        const desc_source = () => {
          let data0 = objs[0];
          let data1 = objs[1];
          let data2 = objs[2];
          let data3 = objs[3];

          let perate_data1 = data1.to_perate(data0);
          let perate_data2 = data2.to_perate(data0);
          let perate_data3 = data3.to_perate(data0);

          if (!cpt) {
            $('#source_bb').html(
              `
              <div class="bar_base inline">
                <div class="bb" style="height:100%;">
                  <div class="bar bar_0" style="height:${perate_data1}%;"></div>
                  <div class="bar bar_1" style="height:${perate_data2}%;"></div>
                  <div class="bar bar_2" style="height:${perate_data3}%;"></div>
                </div>
              </div>
              `
            );
            $('#source_data0').html(`
              <div class="amount text_overflow">${data1.str_jp()}</div>
              <div class="rate text_overflow">${perate_data1}%</div>
            `);
            $('#source_data1').html(`
              <div class="amount text_overflow">${data2.str_jp()}</div>
              <div class="rate text_overflow">${perate_data2}%</div>
            `);
            $('#source_data2').html(`
              <div class="amount text_overflow">${data3.str_jp()}</div>
              <div class="rate text_overflow">${perate_data3}%</div>
            `);
          } else {
            let c_data0 = c_objs[0];
            let c_data1 = c_objs[1];
            let c_data2 = c_objs[2];
            let c_data3 = c_objs[3];

            let max = Math.max.apply(null,[data0,c_data0].map(function(o){return o;}));

            let rate_total = data0.to_perate(max);
            let rate_c_total = c_data0.to_perate(max);

            let perate_c_data1 = c_data1.to_perate(c_data0);
            let perate_c_data2 = c_data2.to_perate(c_data0);
            let perate_c_data3 = c_data3.to_perate(c_data0);

            let rate_data1 = data1.to_rate(c_data1).rate_str();
            let margin_data1 = (data1 - c_data1).margin_str(``);
            let rate_data2 = data2.to_rate(c_data2).rate_str();
            let margin_data2 = (data2 - c_data2).margin_str(``);
            let rate_data3 = data3.to_rate(c_data3).rate_str();
            let margin_data3 = (data3 - c_data3).margin_str(``);

            $('#source_bb').html(`
              <div class="bar_base inline" data-title="比較">
                <div class="bb" style="height:${rate_c_total}%;">
                  <div class="bar bar_0" style="height:${perate_c_data1}%;"></div>
                  <div class="bar bar_1" style="height:${perate_c_data2}%;"></div>
                  <div class="bar bar_2" style="height:${perate_c_data3}%;"></div>
                </div>
              </div>
              <div class="bar_base inline" data-title="">
                <div class="bb" style="height:${rate_total}%;">
                  <div class="bar bar_0" style="height:${perate_data1}%;"></div>
                  <div class="bar bar_1" style="height:${perate_data2}%;"></div>
                  <div class="bar bar_2" style="height:${perate_data3}%;"></div>
                </div>
              </div>
            `);
            $('#source_data0').html(`
              <div class="amount text_overflow">${margin_data1}</div>
              <div class="rate text_overflow">${rate_data1}</div>
            `);
            $('#source_data1').html(`
              <div class="amount text_overflow">${margin_data2}</div>
              <div class="rate text_overflow">${rate_data2}</div>
            `);
            $('#source_data2').html(`
              <div class="amount text_overflow">${margin_data3}</div>
              <div class="rate text_overflow">${rate_data3}</div>
            `);
          }

        }
        desc_source();
      }
      const desc_customer_section = () => {
        let cna = ["gender","generation"];
        let objs = data.data.geneder;
        let c_objs = data.cdata.geneder;

        let total = datas.sum_val(`data_6`);
        let c_total = c_datas.sum_val(`data_6`);
        const desc_gender = () => {
          let male = objs.filter(({gender}) => gender == 1).sum_val(`count`);
          let female = objs.filter(({gender}) => gender == 2).sum_val(`count`);

          let perate_male = male.to_perate(total);
          let perate_female = female.to_perate(total);

          if (!cpt) {
            $('#customer_gender').html(`
              <div class="bar_base inline">
                <div class="bb" style="height:100%;">
                  <div class="bar bar_0" style="height:${perate_male}%;"></div>
                  <div class="bar bar_1" style="height:${perate_female}%;"></div>
                </div>
              </div>
            `);
            $('#customer_male').html(`
              <div class="amount text_overflow">${male.str_jp()}</div>
              <div class="rate text_overflow">${perate_male}%</div>
            `);
            $('#customer_female').html(`
              <div class="amount text_overflow">${female.str_jp()}</div>
              <div class="rate text_overflow">${perate_female}%</div>
            `);
          } else {
            let max = Math.max.apply(null,[total,c_total].map(function(o){return o;}));

            let rate_total = total.to_perate(max);
            let rate_c_total = c_total.to_perate(max);

            let c_male = c_objs.filter(({gender}) => gender == 1).sum_val(`count`);
            let c_female = c_objs.filter(({gender}) => gender == 2).sum_val(`count`);

            let perate_c_male = c_male.to_perate(c_total);
            let perate_c_female = c_female.to_perate(c_total);

            let rate_male = male.to_rate(c_male).rate_str();
            let margin_male = (male - c_male).margin_str(``);

            let rate_female = female.to_rate(c_female).rate_str();
            let margin_female = (female - c_female).margin_str(``);

            $('#customer_gender').html(`
              <div class="bar_base inline" data-title="比較">
                <div class="bb" style="height:${rate_c_total}%;">
                  <div class="bar bar_0" style="height:${perate_c_male}%;"></div>
                  <div class="bar bar_1" style="height:${perate_c_female}%;"></div>
                </div>
              </div>
              <div class="bar_base inline" data-title="">
                <div class="bb" style="height:${rate_total}%;">
                  <div class="bar bar_0" style="height:${perate_male}%;"></div>
                  <div class="bar bar_1" style="height:${perate_female}%;"></div>
                </div>
              </div>
            `);
            $('#customer_male').html(`
              <div class="amount text_overflow">${margin_male}</div>
              <div class="rate text_overflow">${rate_male}</div>
            `);
            $('#customer_female').html(`
              <div class="amount text_overflow">${margin_female}</div>
              <div class="rate text_overflow">${rate_female}</div>
            `);
          }
        }
        const desc_generation = () => {
          let age1 = objs.filter(({generation}) => generation == 1).sum_val(`count`);
          let age2 = objs.filter(({generation}) => generation == 2).sum_val(`count`);
          let age3 = objs.filter(({generation}) => generation == 3).sum_val(`count`);

          let perate_age1 = age1.to_perate(total);
          let perate_age2 = age2.to_perate(total);
          let perate_age3 = age3.to_perate(total);

          if (!cpt) {
            $('#customer_generation').html(`
              <div class="bar_base inline">
                <div class="bb" style="height:100%;">
                  <div class="bar bar_0" style="height:${perate_age1}%;"></div>
                  <div class="bar bar_1" style="height:${perate_age2}%;"></div>
                  <div class="bar bar_2" style="height:${perate_age3}%;"></div>
                </div>
              </div>
            `);
            $('#customer_age1').html(`
              <div class="amount text_overflow">${age1.str_jp()}</div>
              <div class="rate text_overflow">${perate_age1}%</div>
            `);
            $('#customer_age2').html(`
              <div class="amount text_overflow">${age2.str_jp()}</div>
              <div class="rate text_overflow">${perate_age2}%</div>
            `);
            $('#customer_age3').html(`
              <div class="amount text_overflow">${age3.str_jp()}</div>
              <div class="rate text_overflow">${perate_age3}%</div>
            `);
          } else {
            let max = Math.max.apply(null,[total,c_total].map(function(o){return o;}));

            let rate_total = total.to_perate(max);
            let rate_c_total = c_total.to_perate(max);

            let c_age1 = c_objs.filter(({generation}) => generation == 1).sum_val(`count`);
            let c_age2 = c_objs.filter(({generation}) => generation == 2).sum_val(`count`);
            let c_age3 = c_objs.filter(({generation}) => generation == 3).sum_val(`count`);

            let perate_c_age1 = c_age1.to_perate(c_total);
            let perate_c_age2 = c_age2.to_perate(c_total);
            let perate_c_age3 = c_age3.to_perate(c_total);

            let rate_age1 = age1.to_rate(c_age1).rate_str();
            let margin_age1 = (age1 - c_age1).margin_str(``);
            let rate_age2 = age2.to_rate(c_age2).rate_str();
            let margin_age2 = (age2 - c_age2).margin_str(``);
            let rate_age3 = age3.to_rate(c_age3).rate_str();
            let margin_age3 = (age3 - c_age3).margin_str(``);

            $('#customer_generation').html(`
              <div class="bar_base inline" data-title="比較">
                <div class="bb" style="height:${rate_c_total}%;">
                  <div class="bar bar_0" style="height:${perate_c_age1}%;"></div>
                  <div class="bar bar_1" style="height:${perate_c_age2}%;"></div>
                  <div class="bar bar_2" style="height:${perate_c_age3}%;"></div>
                </div>
              </div>
              <div class="bar_base inline">
                <div class="bb" style="height:${rate_total}%;">
                  <div class="bar bar_0" style="height:${perate_age1}%;"></div>
                  <div class="bar bar_1" style="height:${perate_age2}%;"></div>
                  <div class="bar bar_2" style="height:${perate_age3}%;"></div>
                </div>
              </div>
            `);
            $('#customer_age1').html(`
              <div class="amount text_overflow">${margin_age1}</div>
              <div class="rate text_overflow">${rate_age1}</div>
            `);
            $('#customer_age2').html(`
              <div class="amount text_overflow">${margin_age2}</div>
              <div class="rate text_overflow">${rate_age2}</div>
            `);
            $('#customer_age3').html(`
              <div class="amount text_overflow">${margin_age3}</div>
              <div class="rate text_overflow">${rate_age3}</div>
            `);
          }
        }
        desc_gender();
        desc_generation();
      }
      const desc_hour_section = () => {
        (() => {
          let indi_ap = ``;
          for (let i = 6;i <= 23;i++) {
            indi_ap += `<div class="cel">${i}:00</div>`;
          }
          let max = data.data.hour.max_val(`data_0`);
          let content_ap = ``;
          for (let i = 6;i <= 23;i++) {
            for (let idx = 0;idx < 7;idx++) {
              let result = data.data.hour.filter((cell) => cell.time == i && cell.week == idx);
              let amount = result.sum_val(`data_0`);
              let rate = amount.to_perate(max);
              content_ap += `<div class="cel" style="opacity:${20 + rate.to_perate(100)}%;"></div>`;
            }
          }
          if (!cpt) {
            $('#hour_graph_base').html(
              `
              <div class="week_base">
                <div class="cels_base">${content_ap}</div>
                <div class="indi_base">${indi_ap}</div>
              </div>
              `
            );
          } else {
            let c_max = data.cdata.hour.max_val(`data_0`);
            let c_content_ap = ``;
            for (let i = 6;i <= 23;i++) {
              for (let idx = 0;idx < 7;idx++) {
                let result = data.cdata.hour.filter((cell) => cell.time == i && cell.week == idx);
                let amount = result.sum_val(`data_0`);
                let rate = amount.to_perate(c_max);
                c_content_ap += `<div class="cel" style="opacity:${20 + rate.to_perate(100)}%;"></div>`;
              }
            }

            $('#hour_graph_base').html(
              `
              <div class="week_base week_con_base">
                <div class="cels_base">${content_ap}</div>
                <div class="indi_base">${indi_ap}</div>
                <div class="cels_base cells_con_base">${c_content_ap}</div>
              </div>
              `
            );
          }
        })();
        (() => {
          let ap = ``;
          for (let i = 0;i < 7;i++) {
            ap +=`<div class="cel">${wna[i]}</div>`;
          }

          if (!cpt) {
            $('#hour_week_indi').html(
              `
              <div class="week_base">
                <div class="indi_base">${ap}</div>
                <div class="empty"></div>
              </div>
              `
            );
          } else {
            $('#hour_week_indi').html(
              `
              <div class="week_base week_con_base">
                <div class="indi_base">${ap}</div>
                <div class="empty"></div>
                <div class="indi_base">${ap}</div>
              </div>
              `
            );
          }
        })();
        (() => {
          let max = data.data.hour.max_val(`data_0`);
          let min = data.data.hour.min_val(`data_0`);
          if (!cpt) {
            $('#hour_gradient_indi').html(
              `
              <div class="week_base">
                <div class="indi_base">
                  <div class="number inline">${min}人</div>
                  <div class="bar inline"></div>
                  <div class="number inline">${max}人</div>
                </div>
                <div class="empty"></div>
              </div>
              `
            );
          } else {
            let c_max = data.cdata.hour.max_val(`data_0`);
            let c_min = data.cdata.hour.min_val(`data_0`);

            $('#hour_gradient_indi').html(
              `
              <div class="week_base week_con_base">
                <div class="indi_base">
                  <div class="number inline">${min}人</div>
                  <div class="bar inline"></div>
                  <div class="number inline">${max}人</div>
                </div>
                <div class="empty"></div>
                <div class="indi_base">
                  <div class="number inline">${c_min}人</div>
                  <div class="bar con_bar inline"></div>
                  <div class="number inline">${c_max}人</div>
                </div>
              </div>
              `
            );
          }
        })();
      }
      const desc_appearance_section = () => {
        let mcia = [2,6];
        let mcna = ["w_a","c_a"];
        let mcda = ["円","人"];

        let ave_objs = [
          [89065,32.045],
          [89065,32.045],
          [18901,7.2496]
        ];
        let dlna = ["全国平均","あなた"];

        let period_length = data.data.length.sum_val(`period_length`);
        let obj_length = data.data.length.sum_val(`obj_length`);

        const section_content = (mbt) => {
          let amount,ave,rate,margin;

          const desc_leveling = () => {
            amount = (datas.sum_val(`data_${mcia[mbt]}`) / period_length).to_devide(1) || 0;
            ave = (ave_objs[st][mbt] * obj_length).to_devide(1);
            rate = amount.to_rate(ave).rate_str();
            margin = (amount - ave).margin_str(mcda[mbt]);
          }
          const desc_line = () => {
            let graph_data = [{
              data:[ave,amount],
              backgroundColor:[`#f4f4f4`,`rgba(54,100,180,1)`],
              borderColor: "",
              borderWidth:0,
              yAxisID: "y-axis-0",
            }];
            let graph_option = {
              maintainAspectRatio: true,
              responsive: true,
              legend: {
                display: false,
                labels:{
                  fontSize:8
                }
              },
              title: {display:false,fontSize:12,text:"実績値日別推移",},
              elements: {point:{radius:1.5}},
              scales: {
                yAxes: [{
                  id: "y-axis-0",
                  type: "linear",
                  position: "left",
                  gridLines: {
                    display:true,
                    drawBorder: false,
                    zeroLineColor:"#eee",
                    color:"#eee"
                  },
                  ticks: {
                    min:0,
                    autoSkip: true,
                    maxTicksLimit: 3,
                    fontSize:10,
                    callback: function(label, index, labels) {
                      return label.str_jp();
                    }
                  },
                }],
                xAxes: [{
                  barPercentage: 0.75,
                  categoryPercentage: 0.75,
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 4,
                    maxRotation: 0,
                    minRotation: 0,
                    fontSize:10,
                  },
                  gridLines: {
                    display:false,
                  },
                  scaleLabel: {
                    display: false,
                    labelString: '日'
                  }
                }]
              },
              tooltips: {
                bodySpacing:5,
                titleFontSize:12.5,
                bodyFontSize:15,
                intersect:false,
                axis:'x',
                mode:'index',
                callbacks: {
                  title:function(t,d) {
                    return;
                  },
                  label:function(t,d) {
                    let index = t.index;
                    return `${dlna[index]} : ${t.yLabel.toLocaleString() + mcda[mbt]}`;
                  }
                }
              }
            }
            appearance_bar.data = {
              labels:dlna,
              datasets:graph_data
            };
            appearance_bar.options = graph_option;
            appearance_bar.update();
          }
          const desc_details = () => {
            $('#appearance_margin').html(margin);
            $('#appearance_rate').html(rate);
          }

          desc_leveling();
          desc_line();
          desc_details();
        }
        $(document).off('input',`input[name="appearance_input_"]`).on('input','input[name="appearance_input_"]',function() {
          let index = $('input[name="appearance_input_"]').index(this);
          section_content(index);
        });
        section_content(0);
      }

      desc_mission_section();
      desc_money_section();
      desc_week_section();
      desc_source_section();
      desc_customer_section();
      desc_hour_section();
      desc_appearance_section();
    }

    desc_content_leveling();
    const desc_graph_init = (sender1,sender2,sender3,sender4) => {
      eval(`try {${sender1}.destroy();} catch(err) {}`);
      eval(`${sender2}.canvas.height = 100;`);
      eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
    }

    let trend_line;
    let integral_line;
    let mission_line;
    let mission_pie;
    let appearance_bar;
    let week_line;

    let trend_line_ctx = document.getElementById('trend_line').getContext('2d');
    desc_graph_init("trend_line","trend_line_ctx",'bar');
    let integral_line_ctx = document.getElementById('integral_line').getContext('2d');
    desc_graph_init("integral_line","integral_line_ctx",'bar');
    let mission_line_ctx = document.getElementById('mission_line').getContext('2d');
    desc_graph_init("mission_line","mission_line_ctx",'bar');
    let mission_pie_ctx = document.getElementById('mission_pie').getContext('2d');
    desc_graph_init("mission_pie","mission_pie_ctx",'pie');
    let week_line_ctx = document.getElementById('week_line').getContext('2d');
    desc_graph_init("week_line","week_line_ctx",'bar');
    let appearance_bar_ctx = document.getElementById('appearance_bar').getContext('2d');
    desc_graph_init("appearance_bar","appearance_bar_ctx",'bar');

    desc_cells_btn();
    desc_dynamic_sections(0);
    desc_static_sections();
    $(document).off('input','input[name="cell_input_"]').on('input','input[name="cell_input_"]',function() {
      let index = $('input[name="cell_input_"]').index(this);
      desc_dynamic_sections(Number(index));
    });
  } else if (bt == 1) {
    const desc_content_leveling = () => {
      let ap = ``;
      if (st == 0) {
        ap +=
        `
        <div class="section">
          <div class="section_title">店舗別</div>
          <div class="cells_box">
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">リスト</div>
                <div class="content _segment_">
                  <div class="table_base table_base2" id="clinic_table_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客属性</div>
                <div class="content _segment_">
                  <div class="table_base table_base2 no_border" id="clinic_customer_table_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_nx1__15rem inline">
              <div class="box">
                <div class="cell_title text_overflow">総合売上パイチャート</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="clinic_pie" width="100" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_13x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">箱ひげ図</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="clinic_boxplot" width="300" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      }
      if (st <= 1) {
        ap +=
        `
        <div class="section">
          <div class="section_title">担当者別</div>
          <div class="cells_box">
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">リスト</div>
                <div class="content _segment_">
                  <div class="table_base table_base2" id="staff_table_base">
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客属性</div>
                <div class="content _segment_">
                  <div class="table_base table_base2 no_border" id="staff_customer_table_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_nx1__15rem inline">
              <div class="box">
                <div class="cell_title text_overflow">総合売上パイチャート</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="staff_pie" width="100" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_13x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">箱ひげ図</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="staff_boxplot" width="300" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      }
      ap +=
      `
      <div class="section">
        <div class="cells_box">
          <div class="cell cell_13x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">来院動機別</div>
              <div class="content _sub_segment_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="vr_polar" width="200" height="100"></canvas>
                  </div>
                  <div class="table_base" id="vr_table_base">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_13x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">時間帯別</div>
              <div class="content _sub_segment_">
                <div clas="base">
                  <div class="graph_wrap">
                    <canvas id="hour_bar" width="200" height="100"></canvas>
                  </div>
                  <div class="table_base" id="hour_table_base">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section_title">顧客属性別</div>
        <div class="cells_box">
          <div class="cell cell_4x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">リスト</div>
              <div class="content _segment_">
                <div class="table_base table_base2" id="customer_table_base">
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_nx1__15rem inline">
            <div class="box">
              <div class="cell_title text_overflow">総合売上パイチャート</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="customer_pie" width="100" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_13x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">箱ひげ図</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="customer_boxplot" width="300" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="section">
        <div class="section_title">自費メニュー別</div>
        <div class="cells_box">
          <div class="cell cell_4x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">リスト</div>
              <div class="content _segment_">
                <div class="table_base table_base2" id="menu_table_base">
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_4x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">顧客属性</div>
              <div class="content _segment_">
                <div class="table_base table_base2 no_border" id="menu_customer_table_base"></div>
              </div>
            </div>
          </div>
          <div class="cell cell_nx1__15rem inline">
            <div class="box">
              <div class="cell_title text_overflow">総合売上パイチャート</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="menu_pie" width="100" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      $('#content_base').html(ap);
    }
    const desc_static_sections = () => {
      const desc_clinics = () => {
        let obj = data.data.cl;
        let c_obj = data.cdata.cl;
        if (!obj.exist_val()) return;

        let sum_data_0 = obj.sum_val(`data_0`);
        let sum_data_1 = obj.sum_val(`data_1`);
        let sum_data_2 = obj.sum_val(`data_2`);
        let sum_data_3 = obj.sum_val(`data_3`);
        let sum_data_4 = obj.sum_val(`data_4`);
        let sum_data_5 = obj.sum_val(`data_5`);
        let sum_data_6 = obj.sum_val(`data_6`);

        const desc_pie = () => {
          let data_arr = [];
          for (let i = 0;i < 5;i++) {
            if (i >= obj.length) continue;
            let cell = obj[i];
            data_arr.push(cell.data_0);
          }
          if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

          let graph_plugin = {
            afterDatasetsDraw: function (chart, easing) {
              var ctx = chart.ctx;
              chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                  meta.data.forEach(function (element, index) {
                    ctx.fillStyle = "white";
                    var fontSize = 8;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    let amount = data_arr[index].to_perate(sum_data_0);
                    var dataString =
                    amount > 0 ? [`${amount}%`] : [``];
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                  });
                }
              });
            }
          }
          let graph_data = [{
            data:data_arr,
            backgroundColor:pgca,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            pieceLabel: {render: 'label',position: 'outside'},
            tooltips:{
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  let name = index != 5 ? obj[index].obj_name : `その他`;
                  return `${name}`;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `¥${amount.toLocaleString()}`;
                }
              }
            }
          }
          clinic_pie.data = {
            labels:"",
            datasets:graph_data,
          };
          clinic_pie.config.plugins = [graph_plugin];
          clinic_pie.options = graph_option;
          clinic_pie.update();
        }
        const desc_plot = () => {
          let data_0_arr = [];
          let data_1_arr = [];
          let data_2_arr = [];
          let data_3_arr = [];
          let data_c_0_arr = [];
          let data_c_1_arr = [];
          let data_c_2_arr = [];
          let data_c_3_arr = [];

          obj.forEach((cell) => {
            data_0_arr.push(cell.data_0);
            data_1_arr.push(cell.data_1);
            data_2_arr.push(cell.data_2);
            data_3_arr.push(cell.data_3);
          });
          if (cpt) {
            c_obj.forEach((cell) => {
              data_c_0_arr.push(cell.data_0);
              data_c_1_arr.push(cell.data_1);
              data_c_2_arr.push(cell.data_2);
              data_c_3_arr.push(cell.data_3);
            });
          }
          let graph_data = [];

          graph_data = [{
            label:"当期",
            backgroundColor:'rgba(54,100,180,.5)',
            borderColor:'rgba(54,100,180,1)',
            borderWidth: 1.5,
            outlierColor: '#999999',
            padding: 10,
            itemRadius: 0,
            data: [data_0_arr,data_1_arr,data_2_arr,data_3_arr],
          }];
          if (cpt) {
            graph_data.push({
              label:"前期",
              backgroundColor:'rgba(242,100,100,.5)',
              borderColor:'rgb(242,100,100)',
              borderWidth: 1.5,
              outlierColor: '#999999',
              padding: 10,
              itemRadius: 0,
              data: [data_c_0_arr,data_c_1_arr,data_c_2_arr,data_c_3_arr],
            });
          }
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{labels:{fontSize:10,boxWidth:24}},
            title: {display:false},
            scales: {
              yAxes: [{
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:6,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              }],
              xAxes: [{
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  fontSize:8,
                  autoSkip: true,
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                }
              }]
            },
            tooltips:{
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              intersect:false,
              axis:'x',
              mode:'index',
            }
          }
          clinic_boxplot.data = {
            labels:["総合売上","保険請求","保険負担","自費売上"],
            datasets:graph_data,
          };
          clinic_boxplot.options = graph_option;
          clinic_boxplot.update();
        }
        const desc_table = () => {
          let ap = ``;
          obj.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_2;
            let data_3 = cell.data_3;
            let data_4 = cell.data_4;
            let data_5 = cell.data_5;
            let data_6 = cell.data_6;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);
              let rate_2 = data_2.to_perate(sum_data_2);
              let rate_3 = data_3.to_perate(sum_data_3);
              let rate_4 = data_4.to_perate(sum_data_4);
              let rate_5 = data_5.to_perate(sum_data_5);
              let rate_6 = data_6.to_perate(sum_data_6);

              for (let i = 0;i < 7;i++) {
                app +=
                `
                <td>
                  <div class="amount">${eval(`data_${i}`).toLocaleString()} <span class="percent">${eval(`rate_${i}`)}%</span></div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);
                let c_data_2 = c_cell.sum_val(`data_2`);
                let c_data_3 = c_cell.sum_val(`data_3`);
                let c_data_4 = c_cell.sum_val(`data_4`);
                let c_data_5 = c_cell.sum_val(`data_5`);
                let c_data_6 = c_cell.sum_val(`data_6`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();
                let rate_2 = data_2.to_rate(c_data_2).rate_str();
                let rate_3 = data_3.to_rate(c_data_3).rate_str();
                let rate_4 = data_4.to_rate(c_data_4).rate_str();
                let rate_5 = data_5.to_rate(c_data_5).rate_str();
                let rate_6 = data_6.to_rate(c_data_6).rate_str();

                for (let i = 0;i < 7;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">${eval(`data_${i}`).toLocaleString()} <span>(${eval(`c_data_${i}`).toLocaleString()})</span></div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 7;i++) {
                  app +=
                  `
                  <td>
                    <div class="rate">-%</div>
                    <div class="amount">${eval(`data_${i}`).toLocaleString()} <span>(0)</span></div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `
            <tr>
              <th>
                <a href="/achieve_analytics?st=1&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
                  ${user_name==MSD_smn?`${stna[1]}${cell.obj_id}`: cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });

          $('#clinic_table_base').html(
            `
            <table id="clinic_table">
              <thead>
                <tr>
                  <th></th>
                  <th>総売上</th>
                  <th>保険請求額</th>
                  <th>保険負担金</th>
                  <th>自費売上</th>
                  <th>来院数</th>
                  <th>純患数</th>
                  <th>新患数</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#clinic_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }
        const desc_cus = () => {
          let sum_geneder_0 = obj.sum_val(`geneder_0`);
          let sum_geneder_1 = obj.sum_val(`geneder_1`);
          let sum_geneder_2 = obj.sum_val(`geneder_2`);
          let sum_geneder_3 = obj.sum_val(`geneder_3`);
          let sum_geneder_4 = obj.sum_val(`geneder_4`);
          let sum_geneder_5 = obj.sum_val(`geneder_5`);
          let sum_geneder_6 = obj.sum_val(`geneder_6`);
          let sum_geneder_7 = obj.sum_val(`geneder_7`);
          let sum_geneder_8 = obj.sum_val(`geneder_8`);
          let sum_geneder_9 = obj.sum_val(`geneder_9`);

          let ap = ``;
          obj.forEach((cell) => {
            let geneder_0 = cell.geneder_0;
            let geneder_1 = cell.geneder_1;
            let geneder_2 = cell.geneder_2;
            let geneder_3 = cell.geneder_3;
            let geneder_4 = cell.geneder_4;
            let geneder_5 = cell.geneder_5;
            let geneder_6 = cell.geneder_6;
            let geneder_7 = cell.geneder_7;
            let geneder_8 = cell.geneder_8;
            let geneder_9 = cell.geneder_9;


            let app = ``;

            if (!cpt) {
              for (let i = 0;i < 10;i++) {
                let geneder = eval(`geneder_${i}`);
                let sum_geneder = eval(`sum_geneder_${i}`);

                let rate = geneder.to_perate(sum_geneder);

                app +=
                `
                <td>
                  <div class="amount">${geneder.str_jp()} <span class="percent">${rate}%</span></div>
                  <div class="bb" style="width:${rate}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_geneder_0 = c_cell.sum_val(`geneder_0`);
                let c_geneder_1 = c_cell.sum_val(`geneder_1`);
                let c_geneder_2 = c_cell.sum_val(`geneder_2`);
                let c_geneder_3 = c_cell.sum_val(`geneder_3`);
                let c_geneder_4 = c_cell.sum_val(`geneder_4`);
                let c_geneder_5 = c_cell.sum_val(`geneder_5`);
                let c_geneder_6 = c_cell.sum_val(`geneder_6`);
                let c_geneder_7 = c_cell.sum_val(`geneder_7`);
                let c_geneder_8 = c_cell.sum_val(`geneder_8`);
                let c_geneder_9 = c_cell.sum_val(`geneder_9`);

                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  let c_geneder = eval(`c_geneder_${i}`);

                  let rate = geneder.to_rate(c_geneder).rate_str();
                  app +=
                  `
                  <td>
                    <div class="amount">${geneder.str_jp()} <span>(${c_geneder.toLocaleString()})</span></div>
                    <div class="rate">${rate}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 10;i++) {
                  app +=
                  `
                  <td>
                    <div class="rate">-%</div>
                    <div class="amount">${eval(`data_${i}`).toLocaleString()} <span>(0)</span></div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `
            <tr>
              <th>
                <a href="/achieve_analytics?st=1&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
                  ${user_name==MSD_smn?`${stna[1]}${cell.obj_id}`: cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });

          $('#clinic_customer_table_base').html(
            `
            <table id="clinic_customer_table">
              <thead>
                <tr>
                  <th></th>
                  <th>未成年 男性</th>
                  <th>未成年 女性</th>
                  <th>20~34歳 男性</th>
                  <th>20~34歳 女性</th>
                  <th>34~64歳 男性</th>
                  <th>34~64歳 女性</th>
                  <th>65~74歳 男性</th>
                  <th>65~74歳 女性</th>
                  <th>75歳~ 男性</th>
                  <th>75歳~ 女性</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#clinic_customer_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10]}],
            displayLength:5,
            lengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            paging: true,
            order:[[1,"desc"]]
          });
        }

        setTimeout(() => {
          desc_pie();
          desc_plot();
        },250);
        desc_table();
        desc_cus();
      }
      const desc_staffs = () => {
        let obj = data.data.sf;
        let c_obj = data.cdata.sf;
        if (!obj.exist_val()) return;
        let cls = data.data.cls.data.split(',').map((label) => {return {id:Number(label)};});

        let sum_data_0 = obj.sum_val(`data_0`);
        let sum_data_1 = obj.sum_val(`data_1`);
        let sum_data_2 = obj.sum_val(`data_2`);
        let sum_data_3 = obj.sum_val(`data_3`);
        let sum_data_4 = obj.sum_val(`data_4`);
        let sum_data_5 = obj.sum_val(`data_5`);
        let sum_data_6 = obj.sum_val(`data_6`);

        const desc_pie = () => {
          let data_arr = [];
          for (let i = 0;i < 5;i++) {
            if (i >= obj.length) continue;
            let cell = obj[i];
            data_arr.push(cell.data_0);
          }
          if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

          let graph_plugin = {
            afterDatasetsDraw: function (chart, easing) {
              var ctx = chart.ctx;
              chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                  meta.data.forEach(function (element, index) {
                    ctx.fillStyle = "white";
                    var fontSize = 8;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    let amount = data_arr[index].to_perate(sum_data_0);
                    var dataString =
                    amount > 0 ? [`${amount}%`] : [``];
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                  });
                }
              });
            }
          }
          let graph_data = [{
            data:data_arr,
            backgroundColor:pgca,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            pieceLabel: {render: 'label',position: 'outside'},
            tooltips:{
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  let name = index != 5 ? obj[index].obj_name : `その他`;
                  return `${name}`;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `¥${amount.toLocaleString()}`;
                }
              }
            }
          }
          staff_pie.data = {
            labels:"",
            datasets:graph_data,
          };
          staff_pie.config.plugins = [graph_plugin];
          staff_pie.options = graph_option;
          staff_pie.update();
        }
        const desc_plot = () => {
          let data_0_arr = [];
          let data_1_arr = [];
          let data_2_arr = [];
          let data_3_arr = [];
          let data_c_0_arr = [];
          let data_c_1_arr = [];
          let data_c_2_arr = [];
          let data_c_3_arr = [];

          obj.forEach((cell) => {
            data_0_arr.push(cell.data_0);
            data_1_arr.push(cell.data_1);
            data_2_arr.push(cell.data_2);
            data_3_arr.push(cell.data_3);
          });
          if (cpt) {
            c_obj.forEach((cell) => {
              data_c_0_arr.push(cell.data_0);
              data_c_1_arr.push(cell.data_1);
              data_c_2_arr.push(cell.data_2);
              data_c_3_arr.push(cell.data_3);
            });
          }
          let graph_data = [];

          graph_data = [{
            label:"当期",
            backgroundColor:'rgba(54,100,180,.5)',
            borderColor:'rgba(54,100,180,1)',
            borderWidth: 1.5,
            outlierColor: '#999999',
            padding: 10,
            itemRadius: 0,
            data: [data_0_arr,data_1_arr,data_2_arr,data_3_arr],
          }];
          if (cpt) {
            graph_data.push({
              label:"前期",
              backgroundColor:'rgba(242,100,100,.5)',
              borderColor:'rgb(242,100,100)',
              borderWidth: 1.5,
              outlierColor: '#999999',
              padding: 10,
              itemRadius: 0,
              data: [data_c_0_arr,data_c_1_arr,data_c_2_arr,data_c_3_arr],
            });
          }
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{labels:{fontSize:10,boxWidth:24}},
            title: {display:false},
            scales: {
              yAxes: [{
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:6,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              }],
              xAxes: [{
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  fontSize:8,
                  autoSkip: true,
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                }
              }]
            },
            tooltips:{
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              intersect:false,
              axis:'x',
              mode:'index',
            }
          }
          staff_boxplot.data = {
            labels:["総合売上","保険請求","保険負担","自費売上"],
            datasets:graph_data,
          };
          staff_boxplot.options = graph_option;
          staff_boxplot.update();
        }
        const desc_table = () => {
          let ap = ``;
          obj.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_2;
            let data_3 = cell.data_3;
            let data_4 = cell.data_4;
            let data_5 = cell.data_5;
            let data_6 = cell.data_6;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);
              let rate_2 = data_2.to_perate(sum_data_2);
              let rate_3 = data_3.to_perate(sum_data_3);
              let rate_4 = data_4.to_perate(sum_data_4);
              let rate_5 = data_5.to_perate(sum_data_5);
              let rate_6 = data_6.to_perate(sum_data_6);

              for (let i = 0;i < 7;i++) {
                app +=
                `
                <td>
                  <div class="amount">
                    ${eval(`data_${i}`).toLocaleString()}
                    <span class="percent">${eval(`rate_${i}`)}%</span>
                  </div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);
                let c_data_2 = c_cell.sum_val(`data_2`);
                let c_data_3 = c_cell.sum_val(`data_3`);
                let c_data_4 = c_cell.sum_val(`data_4`);
                let c_data_5 = c_cell.sum_val(`data_5`);
                let c_data_6 = c_cell.sum_val(`data_6`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();
                let rate_2 = data_2.to_rate(c_data_2).rate_str();
                let rate_3 = data_3.to_rate(c_data_3).rate_str();
                let rate_4 = data_4.to_rate(c_data_4).rate_str();
                let rate_5 = data_5.to_rate(c_data_5).rate_str();
                let rate_6 = data_6.to_rate(c_data_6).rate_str();

                for (let i = 0;i < 7;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                    </div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 7;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(0)</span>
                    </div>
                    <div class="rate">-%</div>
                  </td>
                  `;
                }
              }
            }
            let link = ``;
            if (cls.filter(({id}) => id == cell.obj_clinic_id).exist_val()) {
              link =
              `
              <a href="/achieve_analytics?st=2&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
                ${user_name==MSD_smn?`${stna[2]}${cell.obj_id}`: cell.obj_name}
              </a>
              `;
            } else {
              link = `${user_name==MSD_smn?`${stna[1]}${cell.obj_id}`: cell.obj_name}`;
            }

            ap +=
            `
            <tr>
              <th>${link}</th>
              ${app}
            </tr>
            `;
          });
          $('#staff_table_base').html(
            `
            <table id="staff_table">
              <thead>
                <tr>
                  <th></th>
                  <th>総合売上</th>
                  <th>保険請求額</th>
                  <th>保険負担金</th>
                  <th>自費売上</th>
                  <th>来院数</th>
                  <th>純患数</th>
                  <th>新患数</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#staff_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }
        const desc_cus = () => {
          let sum_geneder_0 = obj.sum_val(`geneder_0`);
          let sum_geneder_1 = obj.sum_val(`geneder_1`);
          let sum_geneder_2 = obj.sum_val(`geneder_2`);
          let sum_geneder_3 = obj.sum_val(`geneder_3`);
          let sum_geneder_4 = obj.sum_val(`geneder_4`);
          let sum_geneder_5 = obj.sum_val(`geneder_5`);
          let sum_geneder_6 = obj.sum_val(`geneder_6`);
          let sum_geneder_7 = obj.sum_val(`geneder_7`);
          let sum_geneder_8 = obj.sum_val(`geneder_8`);
          let sum_geneder_9 = obj.sum_val(`geneder_9`);

          let ap = ``;
          obj.forEach((cell) => {
            let geneder_0 = cell.geneder_0;
            let geneder_1 = cell.geneder_1;
            let geneder_2 = cell.geneder_2;
            let geneder_3 = cell.geneder_3;
            let geneder_4 = cell.geneder_4;
            let geneder_5 = cell.geneder_5;
            let geneder_6 = cell.geneder_6;
            let geneder_7 = cell.geneder_7;
            let geneder_8 = cell.geneder_8;
            let geneder_9 = cell.geneder_9;


            let app = ``;

            if (!cpt) {
              for (let i = 0;i < 10;i++) {
                let geneder = eval(`geneder_${i}`);
                let sum_geneder = eval(`sum_geneder_${i}`);

                let rate = geneder.to_perate(sum_geneder);

                app +=
                `
                <td>
                  <div class="amount">${geneder.str_jp()} <span class="percent">${rate}%</span></div>
                  <div class="bb" style="width:${rate}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_geneder_0 = c_cell.sum_val(`geneder_0`);
                let c_geneder_1 = c_cell.sum_val(`geneder_1`);
                let c_geneder_2 = c_cell.sum_val(`geneder_2`);
                let c_geneder_3 = c_cell.sum_val(`geneder_3`);
                let c_geneder_4 = c_cell.sum_val(`geneder_4`);
                let c_geneder_5 = c_cell.sum_val(`geneder_5`);
                let c_geneder_6 = c_cell.sum_val(`geneder_6`);
                let c_geneder_7 = c_cell.sum_val(`geneder_7`);
                let c_geneder_8 = c_cell.sum_val(`geneder_8`);
                let c_geneder_9 = c_cell.sum_val(`geneder_9`);

                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  let c_geneder = eval(`c_geneder_${i}`);

                  let rate = geneder.to_rate(c_geneder).rate_str();
                  app +=
                  `
                  <td>
                    <div class="amount">${geneder.str_jp()} <span>(${c_geneder.toLocaleString()})</span></div>
                    <div class="rate">${rate}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 10;i++) {
                  app +=
                  `
                  <td>
                    <div class="rate">-%</div>
                    <div class="amount">${eval(`data_${i}`).toLocaleString()} <span>(0)</span></div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `
            <tr>
              <th>
                <a href="/achieve_analytics?st=2&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
                  ${user_name==MSD_smn?`${stna[1]}${cell.obj_id}`: cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });

          $('#staff_customer_table_base').html(
            `
            <table id="staff_customer_table">
              <thead>
                <tr>
                  <th></th>
                  <th>未成年 男性</th>
                  <th>未成年 女性</th>
                  <th>20~34歳 男性</th>
                  <th>20~34歳 女性</th>
                  <th>34~64歳 男性</th>
                  <th>34~64歳 女性</th>
                  <th>65~74歳 男性</th>
                  <th>65~74歳 女性</th>
                  <th>75歳~ 男性</th>
                  <th>75歳~ 女性</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#staff_customer_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10]}],
            displayLength:5,
            lengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            paging: true,
            order:[[1,"desc"]]
          });
        }

        setTimeout(() => {
          desc_pie();
          desc_plot();
        },250);
        desc_table();
        desc_cus();
      }
      const desc_visit_reason = () => {
        let obj = data.data.vr;
        let c_obj = data.cdata.vr;

        const desc_polar = () => {
          let data_arr = [];
          let tpl = [];

          obj.forEach((cell) => {
            tpl.push(cell.obj_name);

            let data_0 = cell.data_0;
            data_arr.push(data_0);
          });
          let graph_data = [{
            data:data_arr,
            backgroundColor:random_color,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            legend:{
              labels:{
                fontSize:10,
                boxWidth:16
              }
            },
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            pieceLabel: {render: 'label',position: 'outside'},
            tooltips:{
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  return obj[index].obj_name;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `${amount.toLocaleString()}人`;
                }
              }
            }
          }
          vr_polar.data = {
            labels:tpl,
            datasets:graph_data,
          };
          vr_polar.options = graph_option;
          vr_polar.update();
        }
        const desc_table = () => {
          let ap = ``;

          let sum_data_0 = obj.sum_val(`data_0`);
          let sum_data_1 = obj.sum_val(`data_1`);

          obj.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);

              for (let i = 0;i < 2;i++) {
                app +=
                `
                <td>
                  <div class="amount">
                    ${eval(`data_${i}`).toLocaleString()}
                    <span class="percent">${eval(`rate_${i}`)}%</span>
                  </div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();

                for (let i = 0;i < 2;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                    </div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 2;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(0)</span>
                    </div>
                    <div class="rate">-%</div>
                  </td>
                  `;
                }
              }
            }
            let link = cell.obj_name;
            ap +=
            `
            <tr>
              <th>${link}</th>
              ${app}
            </tr>
            `;
          });
          $('#vr_table_base').html(
            `
            <table id="vr_table">
              <thead>
                <tr>
                  <th></th>
                  <th>来院数</th>
                  <th>新規数</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#vr_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }

        setTimeout(() => {
          desc_polar();
        },250);
        desc_table();
      }
      const desc_hour = () => {
        let obj = data.data.hour;
        let c_obj = data.cdata.hour;

        const desc_bar = () => {
          let data_arr = [];
          let tpl = [];

          for (let i = 0;i < 24;i++) {
            tpl.push(`${i}:00`);

            let result = obj.filter(({time}) => time == i);

            let data_0 = result.sum_val(`data_0`);
            data_arr.push(data_0);
          }
          let graph_data = [{
            label:"時間帯別来院数",
            data:data_arr,
            backgroundColor:`rgba(54,100,180,1)`,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            legend:{
              labels:{
                fontSize:10,
                boxWidth:16
              }
            },
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            scales: {
              yAxes: [{
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  autoSkip: true,
                  fontSize:8,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              }],
              xAxes: [{
                barPercentage: .9,
                categoryPercentage:1,
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  min:0,
                  fontSize:8,
                  maxTicksLimit:8,
                  autoSkip: true,
                },
              }]
            },
            tooltips:{
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              intersect:false,
              axis:'x',
              mode:'index',
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  return `${index}:00台`;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `${amount.toLocaleString()}人`;
                }
              }
            }
          }
          hour_bar.data = {
            labels:tpl,
            datasets:graph_data,
          };
          hour_bar.options = graph_option;
          hour_bar.update();
        }
        const desc_table = () => {
          let ap = ``;

          let sum_data_0 = obj.sum_val(`data_0`);
          let sum_data_1 = obj.sum_val(`data_1`);
          let sum_data_2 = obj.sum_val(`data_2`);

          obj.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_2;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);
              let rate_2 = data_1.to_perate(sum_data_2);

              for (let i = 0;i < 3;i++) {
                app +=
                `
                <td>
                  <div class="amount">
                    ${eval(`data_${i}`).toLocaleString()}
                    <span class="percent">${eval(`rate_${i}`)}%</span>
                  </div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({time}) => time == cell.time);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);
                let c_data_2 = c_cell.sum_val(`data_2`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();
                let rate_2 = data_2.to_rate(c_data_2).rate_str();

                for (let i = 0;i < 3;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                    </div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 3;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(0)</span>
                    </div>
                    <div class="rate">-%</div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `
            <tr>
              <th>${cell.time}:00</th>
              ${app}
            </tr>
            `;
          });
          $('#hour_table_base').html(
            `
            <table id="hour_table">
              <thead>
                <tr>
                  <th></th>
                  <th>来院数</th>
                  <th>新規数</th>
                  <th>総合売上</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#hour_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }

        setTimeout(() => {
          desc_bar();
        },250);
        desc_table();
      }
      const desc_customers = () => {
        let obj = data.data.cs;
        let c_obj = data.cdata.cs;
        if (!obj.exist_val()) return;

        let sum_data_0 = obj.sum_val(`data_0`);
        let sum_data_1 = obj.sum_val(`data_1`);
        let sum_data_2 = obj.sum_val(`data_2`);
        let sum_data_3 = obj.sum_val(`data_3`);
        let sum_data_4 = obj.sum_val(`data_4`);
        let sum_data_5 = obj.sum_val(`data_5`);
        let sum_data_6 = obj.sum_val(`data_6`);

        const desc_pie = () => {
          let data_arr = [];
          for (let i = 0;i < 5;i++) {
            if (i >= obj.length) continue;
            let cell = obj[i];
            data_arr.push(cell.data_0);
          }
          if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

          let graph_plugin = {
            afterDatasetsDraw: function (chart, easing) {
              var ctx = chart.ctx;
              chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                  meta.data.forEach(function (element, index) {
                    ctx.fillStyle = "white";
                    var fontSize = 8;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    let amount = data_arr[index].to_perate(sum_data_0);
                    var dataString =
                    amount > 0 ? [`${amount}%`] : [``];
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                  });
                }
              });
            }
          }
          let graph_data = [{
            data:data_arr,
            backgroundColor:pgca,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            pieceLabel: {render: 'label',position: 'outside'},
            tooltips:{
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  let name = index != 5 ? obj[index].obj_name : `その他`;
                  return `${name}`;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `¥${amount.toLocaleString()}`;
                }
              }
            }
          }
          customer_pie.data = {
            labels:"",
            datasets:graph_data,
          };
          customer_pie.config.plugins = [graph_plugin];
          customer_pie.options = graph_option;
          customer_pie.update();
        }
        const desc_plot = () => {
          let data_0_arr = [];
          let data_1_arr = [];
          let data_2_arr = [];
          let data_3_arr = [];
          let data_c_0_arr = [];
          let data_c_1_arr = [];
          let data_c_2_arr = [];
          let data_c_3_arr = [];

          obj.forEach((cell) => {
            data_0_arr.push(cell.data_0);
            data_1_arr.push(cell.data_1);
            data_2_arr.push(cell.data_2);
            data_3_arr.push(cell.data_3);
          });
          if (cpt) {
            c_obj.forEach((cell) => {
              data_c_0_arr.push(cell.data_0);
              data_c_1_arr.push(cell.data_1);
              data_c_2_arr.push(cell.data_2);
              data_c_3_arr.push(cell.data_3);
            });
          }
          let graph_data = [];

          graph_data = [{
            label:"当期",
            backgroundColor:'rgba(54,100,180,.5)',
            borderColor:'rgba(54,100,180,1)',
            borderWidth: 1.5,
            outlierColor: '#999999',
            padding: 10,
            itemRadius: 0,
            data: [data_0_arr,data_1_arr,data_2_arr,data_3_arr],
          }];
          if (cpt) {
            graph_data.push({
              label:"前期",
              backgroundColor:'rgba(242,100,100,.5)',
              borderColor:'rgb(242,100,100)',
              borderWidth: 1.5,
              outlierColor: '#999999',
              padding: 10,
              itemRadius: 0,
              data: [data_c_0_arr,data_c_1_arr,data_c_2_arr,data_c_3_arr],
            });
          }
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{labels:{fontSize:10,boxWidth:24}},
            title: {display:false},
            scales: {
              yAxes: [{
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:6,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              }],
              xAxes: [{
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  fontSize:8,
                  autoSkip: true,
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                }
              }]
            },
            tooltips:{
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              intersect:false,
              axis:'x',
              mode:'index',
            }
          }
          customer_boxplot.data = {
            labels:["総合売上","保険請求","保険負担","自費売上"],
            datasets:graph_data,
          };
          customer_boxplot.options = graph_option;
          customer_boxplot.update();
        }
        const desc_table = () => {
          let ap = ``;
          obj.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_2;
            let data_3 = cell.data_3;
            let data_4 = cell.data_4;
            let data_5 = cell.data_5;
            let data_6 = cell.data_6;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);
              let rate_2 = data_2.to_perate(sum_data_2);
              let rate_3 = data_3.to_perate(sum_data_3);
              let rate_4 = data_4.to_perate(sum_data_4);
              let rate_5 = data_5.to_perate(sum_data_5);
              let rate_6 = data_6.to_perate(sum_data_6);

              for (let i = 0;i < 7;i++) {
                app +=
                `
                <td>
                  <div class="amount">
                    ${eval(`data_${i}`).toLocaleString()}
                    <span class="percent">${eval(`rate_${i}`)}%</span>
                  </div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);
                let c_data_2 = c_cell.sum_val(`data_2`);
                let c_data_3 = c_cell.sum_val(`data_3`);
                let c_data_4 = c_cell.sum_val(`data_4`);
                let c_data_5 = c_cell.sum_val(`data_5`);
                let c_data_6 = c_cell.sum_val(`data_6`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();
                let rate_2 = data_2.to_rate(c_data_2).rate_str();
                let rate_3 = data_3.to_rate(c_data_3).rate_str();
                let rate_4 = data_4.to_rate(c_data_4).rate_str();
                let rate_5 = data_5.to_rate(c_data_5).rate_str();
                let rate_6 = data_6.to_rate(c_data_6).rate_str();

                for (let i = 0;i < 7;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                    </div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 7;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(0)</span>
                    </div>
                    <div class="rate">-%</div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `
            <tr>
              <th>${cell.obj_name}</th>
              ${app}
            </tr>
            `;
          });
          $('#customer_table_base').html(
            `
            <table id="customer_table">
              <thead>
                <tr>
                  <th></th>
                  <th>総売上</th>
                  <th>保険請求額</th>
                  <th>保険負担金</th>
                  <th>自費売上</th>
                  <th>来院数</th>
                  <th>純患数</th>
                  <th>新患数</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#customer_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }

        setTimeout(() => {
          desc_pie();
          desc_plot();
        },250);
        desc_table();
      }
      const desc_menus = () => {
        let obj = data.data.mn;
        let c_obj = data.cdata.mn;
        if (!obj.exist_val()) return;

        let sum_data_0 = obj.sum_val(`data_0`);
        let sum_data_1 = obj.sum_val(`data_1`);
        let sum_data_2 = obj.sum_val(`data_2`);
        let sum_data_3 = obj.sum_val(`data_3`);

        const desc_pie = () => {
          let data_arr = [];
          for (let i = 0;i < 5;i++) {
            if (i >= obj.length) continue;
            let cell = obj[i];
            data_arr.push(cell.data_0);
          }
          if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

          let graph_plugin = {
            afterDatasetsDraw: function (chart, easing) {
              var ctx = chart.ctx;
              chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                  meta.data.forEach(function (element, index) {
                    ctx.fillStyle = "white";
                    var fontSize = 8;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    let amount = data_arr[index].to_perate(sum_data_0);
                    var dataString =
                    amount > 0 ? [`${amount}%`] : [``];
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                  });
                }
              });
            }
          }
          let graph_data = [{
            data:data_arr,
            backgroundColor:pgca,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            pieceLabel: {render: 'label',position: 'outside'},
            tooltips:{
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  let name = index != 5 ? obj[index].obj_name : `その他`;
                  return `${name}`;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `¥${amount.toLocaleString()}`;
                }
              }
            }
          }
          menu_pie.data = {
            labels:"",
            datasets:graph_data,
          };
          menu_pie.config.plugins = [graph_plugin];
          menu_pie.options = graph_option;
          menu_pie.update();
        }
        const desc_table = () => {
          let ap = ``;
          obj.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_2;
            let data_3 = cell.data_3;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);
              let rate_2 = data_2.to_perate(sum_data_2);
              let rate_3 = data_3.to_perate(sum_data_3);

              for (let i = 0;i < 4;i++) {
                app +=
                `
                <td>
                  <div class="amount">
                    ${eval(`data_${i}`).toLocaleString()}
                    <span class="percent">${eval(`rate_${i}`)}%</span>
                  </div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);
                let c_data_2 = c_cell.sum_val(`data_2`);
                let c_data_3 = c_cell.sum_val(`data_3`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();
                let rate_2 = data_2.to_rate(c_data_2).rate_str();
                let rate_3 = data_3.to_rate(c_data_3).rate_str();

                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                    </div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(0)</span>
                    </div>
                    <div class="rate">-%</div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `
            <tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=4&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });
          $('#menu_table_base').html(
            `
            <table id="menu_table">
              <thead>
                <tr>
                  <th></th>
                  <th>自費売上</th>
                  <th>来院数</th>
                  <th>純患数</th>
                  <th>新患数</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#menu_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }
        const desc_cus = () => {
          let sum_geneder_0 = obj.sum_val(`geneder_0`);
          let sum_geneder_1 = obj.sum_val(`geneder_1`);
          let sum_geneder_2 = obj.sum_val(`geneder_2`);
          let sum_geneder_3 = obj.sum_val(`geneder_3`);
          let sum_geneder_4 = obj.sum_val(`geneder_4`);
          let sum_geneder_5 = obj.sum_val(`geneder_5`);
          let sum_geneder_6 = obj.sum_val(`geneder_6`);
          let sum_geneder_7 = obj.sum_val(`geneder_7`);
          let sum_geneder_8 = obj.sum_val(`geneder_8`);
          let sum_geneder_9 = obj.sum_val(`geneder_9`);

          let ap = ``;
          obj.forEach((cell) => {
            let geneder_0 = cell.geneder_0;
            let geneder_1 = cell.geneder_1;
            let geneder_2 = cell.geneder_2;
            let geneder_3 = cell.geneder_3;
            let geneder_4 = cell.geneder_4;
            let geneder_5 = cell.geneder_5;
            let geneder_6 = cell.geneder_6;
            let geneder_7 = cell.geneder_7;
            let geneder_8 = cell.geneder_8;
            let geneder_9 = cell.geneder_9;


            let app = ``;

            if (!cpt) {
              for (let i = 0;i < 10;i++) {
                let geneder = eval(`geneder_${i}`);
                let sum_geneder = eval(`sum_geneder_${i}`);

                let rate = geneder.to_perate(sum_geneder);

                app +=
                `
                <td>
                  <div class="amount">${geneder.str_jp()} <span class="percent">${rate}%</span></div>
                  <div class="bb" style="width:${rate}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_geneder_0 = c_cell.sum_val(`geneder_0`);
                let c_geneder_1 = c_cell.sum_val(`geneder_1`);
                let c_geneder_2 = c_cell.sum_val(`geneder_2`);
                let c_geneder_3 = c_cell.sum_val(`geneder_3`);
                let c_geneder_4 = c_cell.sum_val(`geneder_4`);
                let c_geneder_5 = c_cell.sum_val(`geneder_5`);
                let c_geneder_6 = c_cell.sum_val(`geneder_6`);
                let c_geneder_7 = c_cell.sum_val(`geneder_7`);
                let c_geneder_8 = c_cell.sum_val(`geneder_8`);
                let c_geneder_9 = c_cell.sum_val(`geneder_9`);

                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  let c_geneder = eval(`c_geneder_${i}`);

                  let rate = geneder.to_rate(c_geneder).rate_str();
                  app +=
                  `
                  <td>
                    <div class="amount">${geneder.str_jp()} <span>(${c_geneder.toLocaleString()})</span></div>
                    <div class="rate">${rate}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);

                  app +=
                  `
                  <td>
                    <div class="rate">-%</div>
                    <div class="amount">${geneder.str_jp()} <span>(0)</span></div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `
            <tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=4&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });

          $('#menu_customer_table_base').html(
            `
            <table id="menu_customer_table">
              <thead>
                <tr>
                  <th></th>
                  <th>未成年 男性</th>
                  <th>未成年 女性</th>
                  <th>20~34歳 男性</th>
                  <th>20~34歳 女性</th>
                  <th>34~64歳 男性</th>
                  <th>34~64歳 女性</th>
                  <th>65~74歳 男性</th>
                  <th>65~74歳 女性</th>
                  <th>75歳~ 男性</th>
                  <th>75歳~ 女性</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#menu_customer_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10]}],
            displayLength:5,
            lengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            paging: true,
            order:[[1,"desc"]]
          });
        }

        setTimeout(() => {
          desc_pie();
        },250);
        desc_table();
        desc_cus();
      }

      desc_clinics();
      desc_staffs();
      desc_visit_reason();
      desc_hour();
      desc_customers();
      desc_menus();
    }

    desc_content_leveling();
    const desc_graph_init = (sender1,sender2,sender3,sender4) => {
      eval(`try {${sender1}.destroy();} catch(err) {}`);
      eval(`${sender2}.canvas.height = 100;`);
      eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
    }

    let clinic_pie;
    let clinic_boxplot;
    let staff_pie;
    let staff_boxplot;
    let vr_polar;
    let hour_bar;
    let customer_pie;
    let customer_boxplot;
    let menu_pie;

    let clinic_pie_ctx = st == 0 ? document.getElementById('clinic_pie').getContext('2d') : ``;
    st == 0 ? desc_graph_init("clinic_pie","clinic_pie_ctx",'pie') : console.log();
    let clinic_boxplot_ctx = st == 0 ? document.getElementById('clinic_boxplot').getContext('2d') : ``;
    st == 0 ? desc_graph_init("clinic_boxplot","clinic_boxplot_ctx",'boxplot') : console.log();

    let staff_pie_ctx = st <= 1 ? document.getElementById('staff_pie').getContext('2d') : ``;
    st <= 1 ? desc_graph_init("staff_pie","staff_pie_ctx",'pie') : console.log();
    let staff_boxplot_ctx = st <= 1 ? document.getElementById('staff_boxplot').getContext('2d') : ``;
    st <= 1 ? desc_graph_init("staff_boxplot","staff_boxplot_ctx",'boxplot') : console.log();

    let vr_polar_ctx = document.getElementById('vr_polar').getContext('2d');
    desc_graph_init("vr_polar","vr_polar_ctx",'polarArea');
    let hour_bar_ctx = document.getElementById('hour_bar').getContext('2d');
    desc_graph_init("hour_bar","hour_bar_ctx",'bar');
    let customer_pie_ctx = document.getElementById('customer_pie').getContext('2d');
    desc_graph_init("customer_pie","customer_pie_ctx",'pie');
    let customer_boxplot_ctx = document.getElementById('customer_boxplot').getContext('2d');
    desc_graph_init("customer_boxplot","customer_boxplot_ctx",'boxplot');
    let menu_pie_ctx = document.getElementById('menu_pie').getContext('2d');
    desc_graph_init("menu_pie","menu_pie_ctx",'pie');

    desc_static_sections();
  } else if (bt == 2) {
    if (!data.data.ct1.exist_val()) {
      $('#content_base').html(`<div class="loading_base inline">データがありません。</div>`);
      return;
    }

    const desc_content_leveling = () => {
      $('#content_base').html(
        `
        <div class="section">
          <div class="section_title">施術カテゴリ</div>
          <div class="cells_box">
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">リスト</div>
                <div class="content _segment_">
                  <div class="table_base table_base1 no_border" id="cate_table_base">
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客属性</div>
                <div class="content _segment_">
                  <div class="table_base table_base2 no_border" id="cate_customer_table_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_nx1__15rem inline">
              <div class="box">
                <div class="cell_title text_overflow">総合売上パイチャート</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate_pie" width="100" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_13x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">割合</div>
                <div class="content _bar_box_">
                  <div class="base" id="cate_per">
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_nx1__30rem inline">
              <div class="box ">
                <div class="cell_title text_overflow">割合のトレンド</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="trend_line" width="250" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section_title">自費メニュー</div>
          <div class="cells_box">
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">総合売上パイチャート</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate6_pie" width="100" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_2x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">売上順メニューと累計比率</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate6_line" width="300" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">自費メニュー一覧</div>
                <div class="content _table_">
                  <div class="base">
                    <div class="table_base table_base2" id="menu_table_base"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="cells_box">
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">
                  <i class="far fa-trophy-alt" style="color:rgba(255,215,0,1);"></i>
                  売上上位0~70%グループ概要
                </div>
                <div class="content _bar_box_">
                  <div class="base" id="mg1_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">
                  <i class="far fa-medal" style="color:rgba(200,200,200,1);"></i>
                  70~90%グループ概要
                </div>
                <div class="content _bar_box_">
                  <div class="base" id="mg2_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">
                  <i class="far fa-skull" style="color:#333;"></i>
                  90~95%グループ概要
                </div>
                <div class="content _bar_box_">
                  <div class="base" id="mg3_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">
                  <i class="fas fa-skull" style="color:#333;"></i>
                  95~100%グループ概要
                </div>
                <div class="content _bar_box_">
                  <div class="base" id="mg4_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">0~70% 一覧</div>
                <div class="content _table_">
                  <div class="base">
                    <div class="table_base table_base2" id="mg1_table_base"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">70~90% 一覧</div>
                <div class="content _table_">
                  <div class="base">
                    <div class="table_base table_base2" id="mg2_table_base"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">90~95% 一覧</div>
                <div class="content _table_">
                  <div class="base">
                    <div class="table_base table_base2" id="mg3_table_base"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">95~100% 一覧</div>
                <div class="content _table_">
                  <div class="base">
                    <div class="table_base table_base2" id="mg4_table_base"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="section">
          <div class="section_title">大分類カテゴリ</div>
          <div class="cells_box">
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">リスト</div>
                <div class="content _segment_">
                  <div class="table_base table_base2" id="cate1_table_base">
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客属性</div>
                <div class="content _segment_">
                  <div class="table_base table_base2 no_border" id="cate1_customer_table_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_nx1__15rem inline">
              <div class="box">
                <div class="cell_title text_overflow">自費売上パイチャート</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate1_pie" width="100" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_13x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">箱ひげ図</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate1_boxplot" width="300" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="section">
          <div class="section_title">中分類カテゴリ</div>
          <div class="cells_box">
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">リスト</div>
                <div class="content _segment_">
                  <div class="table_base table_base2" id="cate2_table_base">
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客属性</div>
                <div class="content _segment_">
                  <div class="table_base table_base2 no_border" id="cate2_customer_table_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_nx1__15rem inline">
              <div class="box">
                <div class="cell_title text_overflow">自費売上パイチャート</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate2_pie" width="100" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_13x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">箱ひげ図</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate2_boxplot" width="300" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="section">
          <div class="section_title">小分類カテゴリ</div>
          <div class="cells_box">
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">リスト</div>
                <div class="content _segment_">
                  <div class="table_base table_base2" id="cate3_table_base">
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客属性</div>
                <div class="content _segment_">
                  <div class="table_base table_base2 no_border" id="cate3_customer_table_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_nx1__15rem inline">
              <div class="box">
                <div class="cell_title text_overflow">自費売上パイチャート</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate3_pie" width="100" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_13x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">箱ひげ図</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate3_boxplot" width="300" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="section">
          <div class="section_title">キーワードカテゴリ</div>
          <div class="cells_box">
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">リスト</div>
                <div class="content _segment_">
                  <div class="table_base table_base2" id="cate4_table_base">
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客属性</div>
                <div class="content _segment_">
                  <div class="table_base table_base2 no_border" id="cate4_customer_table_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_nx1__15rem inline">
              <div class="box">
                <div class="cell_title text_overflow">自費売上パイチャート</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate4_pie" width="100" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_13x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">箱ひげ図</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate4_boxplot" width="300" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="section">
          <div class="section_title">回数券・割引券</div>
          <div class="cells_box">
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">リスト</div>
                <div class="content _segment_">
                  <div class="table_base table_base2" id="cate5_table_base">
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客属性</div>
                <div class="content _segment_">
                  <div class="table_base table_base2 no_border" id="cate5_customer_table_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_nx1__15rem inline">
              <div class="box">
                <div class="cell_title text_overflow">回数パイチャート</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="cate5_pie" width="100" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
      );
    }
    const desc_static_sections = () => {
      const desc_cate = () => {
        let obj = data.data.ct;
        let c_obj = data.cdata.ct;
        if (!obj.exist_val()) return;

        let sum_data_0 = obj.sum_val(`data_0`);
        let sum_data_1 = obj.sum_val(`data_1`);
        let sum_data_2 = obj.sum_val(`data_2`);
        let sum_data_3 = obj.sum_val(`data_3`);
        let sum_data_4 = obj.sum_val(`data_4`);
        let sum_data_5 = obj.sum_val(`data_5`);
        let sum_data_6 = obj.sum_val(`data_6`);
        let sum_data_7 = obj.sum_val(`data_7`);
        let sum_data_8 = obj.sum_val(`data_8`);
        let sum_data_9 = obj.sum_val(`data_9`);

        const desc_pie = () => {
          let data_arr = [];
          for (let i = 0;i < 8;i++) {
            let result = obj.filter(({obj_id}) => obj_id == i);
            data_arr.push(result.sum_val(`data_0`));
          }

          let graph_plugin = {
            afterDatasetsDraw: function (chart, easing) {
              var ctx = chart.ctx;
              chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                  meta.data.forEach(function (element, index) {
                    ctx.fillStyle = "white";
                    var fontSize = 8;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    let amount = data_arr[index].to_perate(sum_data_0);
                    var dataString =
                    amount > 0 ? [`${amount}%`] : [``];
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                  });
                }
              });
            }
          }
          let graph_data = [{
            data:data_arr,
            backgroundColor:pgca,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            pieceLabel: {render: 'label',position: 'outside'},
            tooltips:{
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  let name = cna[index];
                  return `${name}`;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `¥${amount.toLocaleString()}`;
                }
              }
            }
          }
          cate_pie.data = {
            labels:"",
            datasets:graph_data,
          };
          cate_pie.config.plugins = [graph_plugin];
          cate_pie.options = graph_option;
          cate_pie.update();
        }
        const desc_table = () => {
          let ap = ``;

          for (let idx = 0;idx < 8;idx++) {
            let result = obj.filter(({obj_id}) => obj_id == idx);
            let exists = result.exist_val();
            let cell =
            exists
            ? result[0]
            : {data_0:0,data_1:0,data_2:0,data_3:0,data_4:0,data_5:0,data_6:0,data_7:0};

            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_2;
            let data_3 = cell.data_3;
            let data_4 = cell.data_4;
            let data_5 = cell.data_5;
            let data_6 = cell.data_6;
            let data_7 = cell.data_7;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);
              let rate_2 = data_2.to_perate(sum_data_2);
              let rate_3 = data_3.to_perate(sum_data_3);
              let rate_4 = data_4.to_perate(sum_data_4);
              let rate_5 = data_5.to_perate(sum_data_5);
              let rate_6 = data_6.to_perate(sum_data_6);
              let rate_7 = data_7.to_perate(sum_data_7);

              for (let i = 0;i < 8;i++) {
                app +=
                `
                <td>
                  <div class="amount">
                    ${eval(`data_${i}`).toLocaleString()}
                    <span class="percent">${eval(`rate_${i}`)}%</span>
                  </div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);
                let c_data_2 = c_cell.sum_val(`data_2`);
                let c_data_3 = c_cell.sum_val(`data_3`);
                let c_data_4 = c_cell.sum_val(`data_4`);
                let c_data_5 = c_cell.sum_val(`data_5`);
                let c_data_6 = c_cell.sum_val(`data_6`);
                let c_data_7 = c_cell.sum_val(`data_7`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();
                let rate_2 = data_2.to_rate(c_data_2).rate_str();
                let rate_3 = data_3.to_rate(c_data_3).rate_str();
                let rate_4 = data_4.to_rate(c_data_4).rate_str();
                let rate_5 = data_5.to_rate(c_data_5).rate_str();
                let rate_6 = data_6.to_rate(c_data_6).rate_str();
                let rate_7 = data_7.to_rate(c_data_7).rate_str();

                for (let i = 0;i < 8;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(${eval(`c_data_${i}`).str_jp()})</span>
                    </div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 8;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}<span>(0)</span>
                    </div>
                    <div class="rate">-%</div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `
            <tr>
              <th>${cna[idx]}</th>
              ${app}
            </tr>
            `;
          }

          $('#cate_table_base').html(
            `
            <table id="cate_table">
              <thead>
                <tr>
                  <th></th>
                  <th>総売上</th>
                  <th>保険売上</th>
                  <th>窓口売上</th>
                  <th>施術回数</th>
                  <th>来院回数</th>
                  <th>純患数</th>
                  <th>新患数</th>
                  <th>稼働時間</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
        }
        const desc_cus = () => {
          let sum_geneder_0 = obj.sum_val(`geneder_0`);
          let sum_geneder_1 = obj.sum_val(`geneder_1`);
          let sum_geneder_2 = obj.sum_val(`geneder_2`);
          let sum_geneder_3 = obj.sum_val(`geneder_3`);
          let sum_geneder_4 = obj.sum_val(`geneder_4`);
          let sum_geneder_5 = obj.sum_val(`geneder_5`);
          let sum_geneder_6 = obj.sum_val(`geneder_6`);
          let sum_geneder_7 = obj.sum_val(`geneder_7`);
          let sum_geneder_8 = obj.sum_val(`geneder_8`);
          let sum_geneder_9 = obj.sum_val(`geneder_9`);

          let ap = ``;

          for (let idx = 0;idx < 8;idx++) {
            let result = obj.filter(({obj_id}) => obj_id == idx);
            let exists = result.exist_val();
            let cell = exists ? result[0] : {geneder_0:0,geneder_1:0,geneder_2:0,geneder_3:0,geneder_4:0,geneder_5:0,geneder_6:0,geneder_7:0,geneder_8:0,geneder_9:0};

            let geneder_0 = cell.geneder_0;
            let geneder_1 = cell.geneder_1;
            let geneder_2 = cell.geneder_2;
            let geneder_3 = cell.geneder_3;
            let geneder_4 = cell.geneder_4;
            let geneder_5 = cell.geneder_5;
            let geneder_6 = cell.geneder_6;
            let geneder_7 = cell.geneder_7;
            let geneder_8 = cell.geneder_8;
            let geneder_9 = cell.geneder_9;

            let app = ``;

            if (!cpt) {
              for (let i = 0;i < 10;i++) {
                let geneder = eval(`geneder_${i}`);
                let sum_geneder = eval(`sum_geneder_${i}`);

                let rate = geneder.to_perate(sum_geneder);

                app +=
                `
                <td>
                  <div class="amount">${geneder.str_jp()} <span class="percent">${rate}%</span></div>
                  <div class="bb" style="width:${rate}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_geneder_0 = c_cell.sum_val(`geneder_0`);
                let c_geneder_1 = c_cell.sum_val(`geneder_1`);
                let c_geneder_2 = c_cell.sum_val(`geneder_2`);
                let c_geneder_3 = c_cell.sum_val(`geneder_3`);
                let c_geneder_4 = c_cell.sum_val(`geneder_4`);
                let c_geneder_5 = c_cell.sum_val(`geneder_5`);
                let c_geneder_6 = c_cell.sum_val(`geneder_6`);
                let c_geneder_7 = c_cell.sum_val(`geneder_7`);
                let c_geneder_8 = c_cell.sum_val(`geneder_8`);
                let c_geneder_9 = c_cell.sum_val(`geneder_9`);

                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  let c_geneder = eval(`c_geneder_${i}`);

                  let rate = geneder.to_rate(c_geneder).rate_str();
                  app +=
                  `
                  <td>
                    <div class="amount">${geneder.str_jp()} <span>(${c_geneder.toLocaleString()})</span></div>
                    <div class="rate">${rate}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  app +=
                  `
                  <td>
                    <div class="rate">-%</div>
                    <div class="amount">${geneder.str_jp()} <span>(0)</span></div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `
            <tr>
              <th>${cna[idx]}</th>
              ${app}
            </tr>
            `;
          }
          $('#cate_customer_table_base').html(
            `
            <table id="cate_customer_table">
              <thead>
                <tr>
                  <th></th>
                  <th>未成年 男性</th>
                  <th>未成年 女性</th>
                  <th>20~34歳 男性</th>
                  <th>20~34歳 女性</th>
                  <th>34~64歳 男性</th>
                  <th>34~64歳 女性</th>
                  <th>65~74歳 男性</th>
                  <th>65~74歳 女性</th>
                  <th>75歳~ 男性</th>
                  <th>75歳~ 女性</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#cate_customer_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10]}],
            displayLength:5,
            lengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            paging: true,
            order:[[1,"desc"]]
          });
        }
        const desc_per = () => {
          let at0 = sum_data_8.to_perate(sum_data_0);
          let at1 = sum_data_8.to_perate(sum_data_2);
          let at2 = obj.filter(({obj_id}) => obj_id != 0 && obj_id != 1).sum_val(`data_4`).to_perate(sum_data_4);
          let at3 = sum_data_9.to_perate(sum_data_4);

          $('#cate_per').html(
            `
            <div class="row">
              <div class="indi">自費/総売</div>
              <div class="contents">
                <div class="amount">${at0}%</div>
                <div class="bb"><div class="b" style="width:${at0}%;"></div></div>
              </div>
            </div>
            <div class="row">
              <div class="indi">自費/窓売</div>
              <div class="contents">
                <div class="amount">${at1}%</div>
                <div class="bb"><div class="b" style="width:${at1}%;"></div></div>
              </div>
            </div>
            <div class="row">
              <div class="indi">保険来院/来院数</div>
              <div class="contents">
                <div class="amount">${at2}%</div>
                <div class="bb"><div class="b" style="width:${at2}%;"></div></div>
              </div>
            </div>
            <div class="row">
              <div class="indi">自費来院/来院数</div>
              <div class="contents">
                <div class="amount">${at3}%</div>
                <div class="bb"><div class="b" style="width:${at3}%;"></div></div>
              </div>
            </div>
            `
          );
        }
        const desc_trend = () => {
          let trends = data.data.tr;
          let data_0_arr = [];
          let data_1_arr = [];
          let data_2_arr = [];
          let data_3_arr = [];
          let data_4_arr = [];

          let tpl = [];

          pa.forEach((label,idx) => {
            tpl.push(convert_pl(label,idx,pt));

            let result = trends.filter(({period}) => period == label);
            let data_0 = result.sum_val(`data_0`);
            let data_1 = result.sum_val(`data_1`);
            let data_2 = result.sum_val(`data_2`);

            let rate_0 = data_2.to_perate(data_0);
            let rate_1 = data_2.to_perate(data_1);

            data_0_arr.push(data_0);
            data_1_arr.push(data_1);
            data_2_arr.push(data_2);
            data_3_arr.push(rate_0);
            data_4_arr.push(rate_1);
          });

          const desc_line = () => {
            let graph_data = [{
              type:"bar",
              label:"総売",
              data:data_0_arr,
              backgroundColor:`rgba(18,83,164,1)`,
              borderWidth:0,
              yAxisID: "y-axis-0"
            },{
              type:"bar",
              label:"窓売",
              data:data_1_arr,
              backgroundColor:`rgba(18,83,164,.66)`,
              borderWidth:0,
              yAxisID: "y-axis-0"
            },{
              type:"bar",
              label:"自費",
              data:data_2_arr,
              backgroundColor:`rgba(18,83,164,.33)`,
              borderWidth:0,
              yAxisID: "y-axis-0"
            },{
              type:"line",
              label:"自費/総売",
              data:data_3_arr,
              borderColor:`rgba(242,100,100,1)`,
              pointBackgroundColor:`rgba(242,100,100,1)`,
              backgroundColor:`#fff`,
              fill:false,
              borderWidth:1,
              yAxisID: "y-axis-1",
              lineTension:0,
            },{
              type:"line",
              label:"自費/窓口",
              data:data_4_arr,
              borderColor:`rgba(54,183,235,1)`,
              pointBackgroundColor:`rgba(54,183,235,1)`,
              backgroundColor:`#fff`,
              fill:false,
              borderWidth:1,
              yAxisID: "y-axis-1",
              lineTension:0,
            }];
            let graph_option = {
              maintainAspectRatio:true,
              responsive: true,
              legend:{
                labels:{
                  fontSize:10,
                  boxWidth:24
                }
              },
              title: {display:false,fontSize:12,text:"",},
              elements: {
                point:{radius:3}
              },
              scales: {
                yAxes: [{
                  id: "y-axis-0",
                  type: "linear",
                  position: "left",
                  gridLines: {
                    display:true,
                    step:true,
                    drawBorder: false,
                    zeroLineColor:"#eee",
                    color:"#eee"
                  },
                  ticks: {
                    min:0,
                    autoSkip: true,
                    fontSize:8,
                    maxTicksLimit:4,
                    callback: function(label, index, labels) {
                      return label.str_jp();
                    }
                  },
                },{
                  id: "y-axis-1",
                  type: "linear",
                  position: "right",
                  gridLines: {
                    display:false,
                    step:true,
                    drawBorder: false,
                    zeroLineColor:"#eee",
                    color:"#eee"
                  },
                  ticks: {
                    min:0,
                    autoSkip: true,
                    fontSize:8,
                    maxTicksLimit:4,
                    callback: function(label, index, labels) {
                      return `${label}%`;
                    }
                  },
                }],
                xAxes: [{
                  barPercentage:.9,
                  categoryPercentage:.9,
                  ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    min:0,
                    fontSize:8,
                    autoSkip: true,
                    maxTicksLimit:8,
                  },
                  gridLines: {
                    display:false,
                    drawBorder: false,
                  },
                  scaleLabel: {
                    display: false,
                  }
                }]
              },
              tooltips: {
                bodySpacing:5,
                titleFontSize:12.5,
                bodyFontSize:15,
                intersect:false,
                axis:'x',
                mode:'index',
                callbacks: {
                  title:function(t,d) {
                    let index = t[0].index;
                    let period = pa[index];
                    period = period == undefined ? `0000-00-00` : period;
                    let week = new Date(period).getDay();
                    return `${period} (${wna[week]})`;
                  },
                  label:function(t,d) {
                    let index = t.index;
                    let idx = t.datasetIndex;
                    let amount = t.yLabel;
                    let dim = ["円","円","円","%","%"];
                    let ar = ["総売上","窓口売上","自費売上","自費/総売上","自費/窓口売上"];
                    return `${ar[idx]} ${amount.toLocaleString()} ${dim[idx]}`;
                  }
                }
              }
            }
            trend_line.data = {
              labels:tpl,
              datasets:graph_data
            };
            trend_line.options = graph_option;
            trend_line.update();
          }
          desc_line();
        }

        setTimeout(() => {
          desc_pie();
        },250);
        desc_table();
        desc_cus();
        desc_per();
        desc_trend();
      }
      const desc_cate1 = () => {
        let obj = data.data.ct1;
        let c_obj = data.cdata.ct1;

        if (!obj.exist_val()) return;

        let sum_data_0 = obj.sum_val(`data_0`);
        let sum_data_1 = obj.sum_val(`data_1`);
        let sum_data_2 = obj.sum_val(`data_2`);
        let sum_data_3 = obj.sum_val(`data_3`);
        const desc_pie = () => {
          let data_arr = [];
          for (let i = 0;i < 5;i++) {
            if (i >= obj.length) continue;
            let cell = obj[i];
            data_arr.push(cell.data_0);
          }
          if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

          let graph_plugin = {
            afterDatasetsDraw: function (chart, easing) {
              var ctx = chart.ctx;
              chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                  meta.data.forEach(function (element, index) {
                    ctx.fillStyle = "white";
                    var fontSize = 8;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    let amount = data_arr[index].to_perate(sum_data_0);
                    var dataString =
                    amount > 0 ? [`${amount}%`] : [``];
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                  });
                }
              });
            }
          }
          let graph_data = [{
            data:data_arr,
            backgroundColor:pgca,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            pieceLabel: {render: 'label',position: 'outside'},
            tooltips:{
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  let name = index != 5 ? obj[index].obj_name : `その他`;
                  return `${name}`;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `¥${amount.toLocaleString()}`;
                }
              }
            }
          }
          cate1_pie.data = {
            labels:"",
            datasets:graph_data,
          };
          cate1_pie.config.plugins = [graph_plugin];
          cate1_pie.options = graph_option;
          cate1_pie.update();
        }
        const desc_plot = () => {
          let data_0_arr = [];
          let data_1_arr = [];
          let data_2_arr = [];
          let data_c_0_arr = [];
          let data_c_1_arr = [];
          let data_c_2_arr = [];

          obj.forEach((cell) => {
            data_0_arr.push(cell.data_1);
            data_1_arr.push(cell.data_2);
            data_2_arr.push(cell.data_3);
          });
          if (cpt) {
            c_obj.forEach((cell) => {
              data_c_0_arr.push(cell.data_1);
              data_c_1_arr.push(cell.data_2);
              data_c_2_arr.push(cell.data_3);
            });
          }
          let graph_data = [];

          graph_data = [{
            label:"当期",
            backgroundColor:'rgba(54,100,180,1.5)',
            borderColor:'rgba(54,100,180,1)',
            borderWidth: 1.5,
            outlierColor: '#999999',
            padding: 10,
            itemRadius: 0,
            data: [data_0_arr,data_1_arr,data_2_arr],
          }];
          if (cpt) {
            graph_data.push({
              label:"前期",
              backgroundColor:'rgba(242,100,100,.5)',
              borderColor:'rgb(242,100,100)',
              borderWidth: 1.5,
              outlierColor: '#999999',
              padding: 10,
              itemRadius: 0,
              data: [data_c_0_arr,data_c_1_arr,data_c_2_arr],
            });
          }
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{labels:{fontSize:10,boxWidth:24}},
            title: {display:false},
            scales: {
              yAxes: [{
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:6,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              }],
              xAxes: [{
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  fontSize:8,
                  autoSkip: true,
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                }
              }]
            },
            tooltips:{
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              intersect:false,
              axis:'x',
              mode:'index',
            }
          }
          cate1_boxplot.data = {
            labels:["施術回数","純患数","新患数"],
            datasets:graph_data,
          };
          cate1_boxplot.options = graph_option;
          cate1_boxplot.update();
        }
        const desc_table = () => {
          let ap = ``;
          obj.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_2;
            let data_3 = cell.data_3;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);
              let rate_2 = data_2.to_perate(sum_data_2);
              let rate_3 = data_3.to_perate(sum_data_3);

              for (let i = 0;i < 4;i++) {
                app +=
                `
                <td>
                  <div class="amount">
                    ${eval(`data_${i}`).toLocaleString()}
                    <span class="percent">${eval(`rate_${i}`)}%</span>
                  </div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);
                let c_data_2 = c_cell.sum_val(`data_2`);
                let c_data_3 = c_cell.sum_val(`data_3`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();
                let rate_2 = data_2.to_rate(c_data_2).rate_str();
                let rate_3 = data_3.to_rate(c_data_3).rate_str();

                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                    </div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(0)</span>
                    </div>
                    <div class="rate">-%</div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `<tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=0&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });
          $('#cate1_table_base').html(
            `
            <table id="cate1_table">
              <thead>
                <tr>
                  <th></th>
                  <th>自費売上</th>
                  <th>施術回数</th>
                  <th>純患数</th>
                  <th>新患数</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#cate1_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }
        const desc_cus = () => {
          let sum_geneder_0 = obj.sum_val(`geneder_0`);
          let sum_geneder_1 = obj.sum_val(`geneder_1`);
          let sum_geneder_2 = obj.sum_val(`geneder_2`);
          let sum_geneder_3 = obj.sum_val(`geneder_3`);
          let sum_geneder_4 = obj.sum_val(`geneder_4`);
          let sum_geneder_5 = obj.sum_val(`geneder_5`);
          let sum_geneder_6 = obj.sum_val(`geneder_6`);
          let sum_geneder_7 = obj.sum_val(`geneder_7`);
          let sum_geneder_8 = obj.sum_val(`geneder_8`);
          let sum_geneder_9 = obj.sum_val(`geneder_9`);

          let ap = ``;
          obj.forEach((cell) => {
            let geneder_0 = cell.geneder_0;
            let geneder_1 = cell.geneder_1;
            let geneder_2 = cell.geneder_2;
            let geneder_3 = cell.geneder_3;
            let geneder_4 = cell.geneder_4;
            let geneder_5 = cell.geneder_5;
            let geneder_6 = cell.geneder_6;
            let geneder_7 = cell.geneder_7;
            let geneder_8 = cell.geneder_8;
            let geneder_9 = cell.geneder_9;


            let app = ``;

            if (!cpt) {
              for (let i = 0;i < 10;i++) {
                let geneder = eval(`geneder_${i}`);
                let sum_geneder = eval(`sum_geneder_${i}`);

                let rate = geneder.to_perate(sum_geneder);

                app +=
                `
                <td>
                  <div class="amount">${geneder.str_jp()} <span class="percent">${rate}%</span></div>
                  <div class="bb" style="width:${rate}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_geneder_0 = c_cell.sum_val(`geneder_0`);
                let c_geneder_1 = c_cell.sum_val(`geneder_1`);
                let c_geneder_2 = c_cell.sum_val(`geneder_2`);
                let c_geneder_3 = c_cell.sum_val(`geneder_3`);
                let c_geneder_4 = c_cell.sum_val(`geneder_4`);
                let c_geneder_5 = c_cell.sum_val(`geneder_5`);
                let c_geneder_6 = c_cell.sum_val(`geneder_6`);
                let c_geneder_7 = c_cell.sum_val(`geneder_7`);
                let c_geneder_8 = c_cell.sum_val(`geneder_8`);
                let c_geneder_9 = c_cell.sum_val(`geneder_9`);

                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  let c_geneder = eval(`c_geneder_${i}`);

                  let rate = geneder.to_rate(c_geneder).rate_str();
                  app +=
                  `
                  <td>
                    <div class="amount">${geneder.str_jp()} <span>(${c_geneder.toLocaleString()})</span></div>
                    <div class="rate">${rate}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 10;i++) {
                  app +=
                  `
                  <td>
                    <div class="rate">-%</div>
                    <div class="amount">${eval(`data_${i}`).toLocaleString()} <span>(0)</span></div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `<tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=0&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });

          $('#cate1_customer_table_base').html(
            `
            <table id="cate1_customer_table">
              <thead>
                <tr>
                  <th></th>
                  <th>未成年 男性</th>
                  <th>未成年 女性</th>
                  <th>20~34歳 男性</th>
                  <th>20~34歳 女性</th>
                  <th>34~64歳 男性</th>
                  <th>34~64歳 女性</th>
                  <th>65~74歳 男性</th>
                  <th>65~74歳 女性</th>
                  <th>75歳~ 男性</th>
                  <th>75歳~ 女性</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#cate1_customer_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10]}],
            displayLength:5,
            lengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            paging: true,
            order:[[1,"desc"]]
          });
        }

        setTimeout(() => {
          desc_pie();
          setTimeout(() => {
            desc_plot();
          },500);
        },250);
        desc_table();
        desc_cus();
      }
      const desc_cate2 = () => {
        let obj = data.data.ct2;
        let c_obj = data.cdata.ct2;

        if (!obj.exist_val()) return;

        let sum_data_0 = obj.sum_val(`data_0`);
        let sum_data_1 = obj.sum_val(`data_1`);
        let sum_data_2 = obj.sum_val(`data_2`);
        let sum_data_3 = obj.sum_val(`data_3`);

        const desc_pie = () => {
          let data_arr = [];
          for (let i = 0;i < 5;i++) {
            if (i >= obj.length) continue;
            let cell = obj[i];
            data_arr.push(cell.data_0);
          }
          if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

          let graph_plugin = {
            afterDatasetsDraw: function (chart, easing) {
              var ctx = chart.ctx;
              chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                  meta.data.forEach(function (element, index) {
                    ctx.fillStyle = "white";
                    var fontSize = 8;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    let amount = data_arr[index].to_perate(sum_data_0);
                    var dataString =
                    amount > 0 ? [`${amount}%`] : [``];
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                  });
                }
              });
            }
          }
          let graph_data = [{
            data:data_arr,
            backgroundColor:pgca,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            pieceLabel: {render: 'label',position: 'outside'},
            tooltips:{
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  let name = index != 5 ? obj[index].obj_name : `その他`;
                  return `${name}`;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `¥${amount.toLocaleString()}`;
                }
              }
            }
          }
          cate2_pie.data = {
            labels:"",
            datasets:graph_data,
          };
          cate2_pie.config.plugins = [graph_plugin];
          cate2_pie.options = graph_option;
          cate2_pie.update();
        }
        const desc_plot = () => {
          let data_0_arr = [];
          let data_1_arr = [];
          let data_2_arr = [];
          let data_c_0_arr = [];
          let data_c_1_arr = [];
          let data_c_2_arr = [];

          obj.forEach((cell) => {
            data_0_arr.push(cell.data_1);
            data_1_arr.push(cell.data_2);
            data_2_arr.push(cell.data_3);
          });
          if (cpt) {
            c_obj.forEach((cell) => {
              data_c_0_arr.push(cell.data_1);
              data_c_1_arr.push(cell.data_2);
              data_c_2_arr.push(cell.data_3);
            });
          }
          let graph_data = [];

          graph_data = [{
            label:"当期",
            backgroundColor:'rgba(54,100,180,.5)',
            borderColor:'rgba(54,100,180,1)',
            borderWidth: 1.5,
            outlierColor: '#999999',
            padding: 10,
            itemRadius: 0,
            data: [data_0_arr,data_1_arr,data_2_arr],
          }];
          if (cpt) {
            graph_data.push({
              label:"前期",
              backgroundColor:'rgba(242,100,100,.5)',
              borderColor:'rgb(242,100,100)',
              borderWidth: 1.5,
              outlierColor: '#999999',
              padding: 10,
              itemRadius: 0,
              data: [data_c_0_arr,data_c_1_arr,data_c_2_arr],
            });
          }
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{labels:{fontSize:10,boxWidth:24}},
            title: {display:false},
            scales: {
              yAxes: [{
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:6,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              }],
              xAxes: [{
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  fontSize:8,
                  autoSkip: true,
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                }
              }]
            },
            tooltips:{
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              intersect:false,
              axis:'x',
              mode:'index',
            }
          }
          cate2_boxplot.data = {
            labels:["施術回数","純患数","新患数"],
            datasets:graph_data,
          };
          cate2_boxplot.options = graph_option;
          cate2_boxplot.update();
        }
        const desc_table = () => {
          let ap = ``;
          obj.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_2;
            let data_3 = cell.data_3;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);
              let rate_2 = data_2.to_perate(sum_data_2);
              let rate_3 = data_3.to_perate(sum_data_3);

              for (let i = 0;i < 4;i++) {
                app +=
                `
                <td>
                  <div class="amount">
                    ${eval(`data_${i}`).toLocaleString()}
                    <span class="percent">${eval(`rate_${i}`)}%</span>
                  </div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);
                let c_data_2 = c_cell.sum_val(`data_2`);
                let c_data_3 = c_cell.sum_val(`data_3`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();
                let rate_2 = data_2.to_rate(c_data_2).rate_str();
                let rate_3 = data_3.to_rate(c_data_3).rate_str();

                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                    </div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(0)</span>
                    </div>
                    <div class="rate">-%</div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `<tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=1&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });
          $('#cate2_table_base').html(
            `
            <table id="cate2_table">
              <thead>
                <tr>
                  <th></th>
                  <th>自費売上</th>
                  <th>施術回数</th>
                  <th>純患数</th>
                  <th>新患数</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#cate2_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }
        const desc_cus = () => {
          let sum_geneder_0 = obj.sum_val(`geneder_0`);
          let sum_geneder_1 = obj.sum_val(`geneder_1`);
          let sum_geneder_2 = obj.sum_val(`geneder_2`);
          let sum_geneder_3 = obj.sum_val(`geneder_3`);
          let sum_geneder_4 = obj.sum_val(`geneder_4`);
          let sum_geneder_5 = obj.sum_val(`geneder_5`);
          let sum_geneder_6 = obj.sum_val(`geneder_6`);
          let sum_geneder_7 = obj.sum_val(`geneder_7`);
          let sum_geneder_8 = obj.sum_val(`geneder_8`);
          let sum_geneder_9 = obj.sum_val(`geneder_9`);

          let ap = ``;
          obj.forEach((cell) => {
            let geneder_0 = cell.geneder_0;
            let geneder_1 = cell.geneder_1;
            let geneder_2 = cell.geneder_2;
            let geneder_3 = cell.geneder_3;
            let geneder_4 = cell.geneder_4;
            let geneder_5 = cell.geneder_5;
            let geneder_6 = cell.geneder_6;
            let geneder_7 = cell.geneder_7;
            let geneder_8 = cell.geneder_8;
            let geneder_9 = cell.geneder_9;


            let app = ``;

            if (!cpt) {
              for (let i = 0;i < 10;i++) {
                let geneder = eval(`geneder_${i}`);
                let sum_geneder = eval(`sum_geneder_${i}`);

                let rate = geneder.to_perate(sum_geneder);

                app +=
                `
                <td>
                  <div class="amount">${geneder.str_jp()} <span class="percent">${rate}%</span></div>
                  <div class="bb" style="width:${rate}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_geneder_0 = c_cell.sum_val(`geneder_0`);
                let c_geneder_1 = c_cell.sum_val(`geneder_1`);
                let c_geneder_2 = c_cell.sum_val(`geneder_2`);
                let c_geneder_3 = c_cell.sum_val(`geneder_3`);
                let c_geneder_4 = c_cell.sum_val(`geneder_4`);
                let c_geneder_5 = c_cell.sum_val(`geneder_5`);
                let c_geneder_6 = c_cell.sum_val(`geneder_6`);
                let c_geneder_7 = c_cell.sum_val(`geneder_7`);
                let c_geneder_8 = c_cell.sum_val(`geneder_8`);
                let c_geneder_9 = c_cell.sum_val(`geneder_9`);

                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  let c_geneder = eval(`c_geneder_${i}`);

                  let rate = geneder.to_rate(c_geneder).rate_str();
                  app +=
                  `
                  <td>
                    <div class="amount">${geneder.str_jp()} <span>(${c_geneder.toLocaleString()})</span></div>
                    <div class="rate">${rate}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 10;i++) {
                  app +=
                  `
                  <td>
                    <div class="rate">-%</div>
                    <div class="amount">${eval(`data_${i}`).toLocaleString()} <span>(0)</span></div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `<tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=1&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });

          $('#cate2_customer_table_base').html(
            `
            <table id="cate2_customer_table">
              <thead>
                <tr>
                  <th></th>
                  <th>未成年 男性</th>
                  <th>未成年 女性</th>
                  <th>20~34歳 男性</th>
                  <th>20~34歳 女性</th>
                  <th>34~64歳 男性</th>
                  <th>34~64歳 女性</th>
                  <th>65~74歳 男性</th>
                  <th>65~74歳 女性</th>
                  <th>75歳~ 男性</th>
                  <th>75歳~ 女性</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#cate2_customer_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10]}],
            displayLength:5,
            lengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            paging: true,
            order:[[1,"desc"]]
          });
        }

        setTimeout(() => {
          desc_pie();
          setTimeout(() => {
            desc_plot();
          },500);
        },250);
        desc_table();
        desc_cus();
      }
      const desc_cate3 = () => {
        let obj = data.data.ct3;
        let c_obj = data.cdata.ct3;

        if (!obj.exist_val()) return;

        let sum_data_0 = obj.sum_val(`data_0`);
        let sum_data_1 = obj.sum_val(`data_1`);
        let sum_data_2 = obj.sum_val(`data_2`);
        let sum_data_3 = obj.sum_val(`data_3`);

        const desc_pie = () => {
          let data_arr = [];
          for (let i = 0;i < 5;i++) {
            if (i >= obj.length) continue;
            let cell = obj[i];
            data_arr.push(cell.data_0);
          }
          if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

          let graph_plugin = {
            afterDatasetsDraw: function (chart, easing) {
              var ctx = chart.ctx;
              chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                  meta.data.forEach(function (element, index) {
                    ctx.fillStyle = "white";
                    var fontSize = 8;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    let amount = data_arr[index].to_perate(sum_data_0);
                    var dataString =
                    amount > 0 ? [`${amount}%`] : [``];
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                  });
                }
              });
            }
          }
          let graph_data = [{
            data:data_arr,
            backgroundColor:pgca,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            pieceLabel: {render: 'label',position: 'outside'},
            tooltips:{
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  let name = index != 5 ? obj[index].obj_name : `その他`;
                  return `${name}`;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `¥${amount.toLocaleString()}`;
                }
              }
            }
          }
          cate3_pie.data = {
            labels:"",
            datasets:graph_data,
          };
          cate3_pie.config.plugins = [graph_plugin];
          cate3_pie.options = graph_option;
          cate3_pie.update();
        }
        const desc_plot = () => {
          let data_0_arr = [];
          let data_1_arr = [];
          let data_2_arr = [];
          let data_c_0_arr = [];
          let data_c_1_arr = [];
          let data_c_2_arr = [];

          obj.forEach((cell) => {
            data_0_arr.push(cell.data_1);
            data_1_arr.push(cell.data_2);
            data_2_arr.push(cell.data_3);
          });
          if (cpt) {
            c_obj.forEach((cell) => {
              data_c_0_arr.push(cell.data_1);
              data_c_1_arr.push(cell.data_2);
              data_c_2_arr.push(cell.data_3);
            });
          }
          let graph_data = [];

          graph_data = [{
            label:"当期",
            backgroundColor:'rgba(54,100,180,.5)',
            borderColor:'rgba(54,100,180,1)',
            borderWidth: 1.5,
            outlierColor: '#999999',
            padding: 10,
            itemRadius: 0,
            data: [data_0_arr,data_1_arr,data_2_arr],
          }];
          if (cpt) {
            graph_data.push({
              label:"前期",
              backgroundColor:'rgba(242,100,100,.5)',
              borderColor:'rgb(242,100,100)',
              borderWidth: 1.5,
              outlierColor: '#999999',
              padding: 10,
              itemRadius: 0,
              data: [data_c_0_arr,data_c_1_arr,data_c_2_arr],
            });
          }
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{labels:{fontSize:10,boxWidth:24}},
            title: {display:false},
            scales: {
              yAxes: [{
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:6,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              }],
              xAxes: [{
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  fontSize:8,
                  autoSkip: true,
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                }
              }]
            },
            tooltips:{
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              intersect:false,
              axis:'x',
              mode:'index',
            }
          }
          cate3_boxplot.data = {
            labels:["施術回数","純患数","新患数"],
            datasets:graph_data,
          };
          cate3_boxplot.options = graph_option;
          cate3_boxplot.update();
        }
        const desc_table = () => {
          let ap = ``;
          obj.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_2;
            let data_3 = cell.data_3;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);
              let rate_2 = data_2.to_perate(sum_data_2);
              let rate_3 = data_3.to_perate(sum_data_3);

              for (let i = 0;i < 4;i++) {
                app +=
                `
                <td>
                  <div class="amount">
                    ${eval(`data_${i}`).toLocaleString()}
                    <span class="percent">${eval(`rate_${i}`)}%</span>
                  </div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);
                let c_data_2 = c_cell.sum_val(`data_2`);
                let c_data_3 = c_cell.sum_val(`data_3`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();
                let rate_2 = data_2.to_rate(c_data_2).rate_str();
                let rate_3 = data_3.to_rate(c_data_3).rate_str();

                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                    </div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(0)</span>
                    </div>
                    <div class="rate">-%</div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `<tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=2&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });
          $('#cate3_table_base').html(
            `
            <table id="cate3_table">
              <thead>
                <tr>
                  <th></th>
                  <th>自費売上</th>
                  <th>施術回数</th>
                  <th>純患数</th>
                  <th>新患数</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#cate3_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }
        const desc_cus = () => {
          let sum_geneder_0 = obj.sum_val(`geneder_0`);
          let sum_geneder_1 = obj.sum_val(`geneder_1`);
          let sum_geneder_2 = obj.sum_val(`geneder_2`);
          let sum_geneder_3 = obj.sum_val(`geneder_3`);
          let sum_geneder_4 = obj.sum_val(`geneder_4`);
          let sum_geneder_5 = obj.sum_val(`geneder_5`);
          let sum_geneder_6 = obj.sum_val(`geneder_6`);
          let sum_geneder_7 = obj.sum_val(`geneder_7`);
          let sum_geneder_8 = obj.sum_val(`geneder_8`);
          let sum_geneder_9 = obj.sum_val(`geneder_9`);

          let ap = ``;
          obj.forEach((cell) => {
            let geneder_0 = cell.geneder_0;
            let geneder_1 = cell.geneder_1;
            let geneder_2 = cell.geneder_2;
            let geneder_3 = cell.geneder_3;
            let geneder_4 = cell.geneder_4;
            let geneder_5 = cell.geneder_5;
            let geneder_6 = cell.geneder_6;
            let geneder_7 = cell.geneder_7;
            let geneder_8 = cell.geneder_8;
            let geneder_9 = cell.geneder_9;


            let app = ``;

            if (!cpt) {
              for (let i = 0;i < 10;i++) {
                let geneder = eval(`geneder_${i}`);
                let sum_geneder = eval(`sum_geneder_${i}`);

                let rate = geneder.to_perate(sum_geneder);

                app +=
                `
                <td>
                  <div class="amount">${geneder.str_jp()} <span class="percent">${rate}%</span></div>
                  <div class="bb" style="width:${rate}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_geneder_0 = c_cell.sum_val(`geneder_0`);
                let c_geneder_1 = c_cell.sum_val(`geneder_1`);
                let c_geneder_2 = c_cell.sum_val(`geneder_2`);
                let c_geneder_3 = c_cell.sum_val(`geneder_3`);
                let c_geneder_4 = c_cell.sum_val(`geneder_4`);
                let c_geneder_5 = c_cell.sum_val(`geneder_5`);
                let c_geneder_6 = c_cell.sum_val(`geneder_6`);
                let c_geneder_7 = c_cell.sum_val(`geneder_7`);
                let c_geneder_8 = c_cell.sum_val(`geneder_8`);
                let c_geneder_9 = c_cell.sum_val(`geneder_9`);

                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  let c_geneder = eval(`c_geneder_${i}`);

                  let rate = geneder.to_rate(c_geneder).rate_str();
                  app +=
                  `
                  <td>
                    <div class="amount">${geneder.str_jp()} <span>(${c_geneder.toLocaleString()})</span></div>
                    <div class="rate">${rate}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 10;i++) {
                  app +=
                  `
                  <td>
                    <div class="rate">-%</div>
                    <div class="amount">${eval(`data_${i}`).toLocaleString()} <span>(0)</span></div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `<tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=2&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });

          $('#cate3_customer_table_base').html(
            `
            <table id="cate3_customer_table">
              <thead>
                <tr>
                  <th></th>
                  <th>未成年 男性</th>
                  <th>未成年 女性</th>
                  <th>20~34歳 男性</th>
                  <th>20~34歳 女性</th>
                  <th>34~64歳 男性</th>
                  <th>34~64歳 女性</th>
                  <th>65~74歳 男性</th>
                  <th>65~74歳 女性</th>
                  <th>75歳~ 男性</th>
                  <th>75歳~ 女性</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#cate3_customer_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10]}],
            displayLength:5,
            lengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            paging: true,
            order:[[1,"desc"]]
          });
        }

        setTimeout(() => {
          desc_pie();
          setTimeout(() => {
            desc_plot();
          },500);
        },250);
        desc_table();
        desc_cus();
      }
      const desc_cate4 = () => {
        let obj = data.data.ct4;
        let c_obj = data.cdata.ct4;

        if (!obj.exist_val()) return;

        let sum_data_0 = obj.sum_val(`data_0`);
        let sum_data_1 = obj.sum_val(`data_1`);
        let sum_data_2 = obj.sum_val(`data_2`);
        let sum_data_3 = obj.sum_val(`data_3`);

        const desc_pie = () => {
          let data_arr = [];
          for (let i = 0;i < 5;i++) {
            if (i >= obj.length) continue;
            let cell = obj[i];
            data_arr.push(cell.data_0);
          }
          if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

          let graph_plugin = {
            afterDatasetsDraw: function (chart, easing) {
              var ctx = chart.ctx;
              chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                  meta.data.forEach(function (element, index) {
                    ctx.fillStyle = "white";
                    var fontSize = 8;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    let amount = data_arr[index].to_perate(sum_data_0);
                    var dataString =
                    amount > 0 ? [`${amount}%`] : [``];
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                  });
                }
              });
            }
          }
          let graph_data = [{
            data:data_arr,
            backgroundColor:pgca,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            pieceLabel: {render: 'label',position: 'outside'},
            tooltips:{
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  let name = index != 5 ? obj[index].obj_name : `その他`;
                  return `${name}`;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `¥${amount.toLocaleString()}`;
                }
              }
            }
          }
          cate4_pie.data = {
            labels:"",
            datasets:graph_data,
          };
          cate4_pie.config.plugins = [graph_plugin];
          cate4_pie.options = graph_option;
          cate4_pie.update();
        }
        const desc_plot = () => {
          let data_0_arr = [];
          let data_1_arr = [];
          let data_2_arr = [];
          let data_c_0_arr = [];
          let data_c_1_arr = [];
          let data_c_2_arr = [];

          obj.forEach((cell) => {
            data_0_arr.push(cell.data_1);
            data_1_arr.push(cell.data_2);
            data_2_arr.push(cell.data_3);
          });
          if (cpt) {
            c_obj.forEach((cell) => {
              data_c_0_arr.push(cell.data_1);
              data_c_1_arr.push(cell.data_2);
              data_c_2_arr.push(cell.data_3);
            });
          }
          let graph_data = [];

          graph_data = [{
            label:"当期",
            backgroundColor:'rgba(54,100,180,.5)',
            borderColor:'rgba(54,100,180,1)',
            borderWidth: 1.5,
            outlierColor: '#999999',
            padding: 10,
            itemRadius: 0,
            data: [data_0_arr,data_1_arr,data_2_arr],
          }];
          if (cpt) {
            graph_data.push({
              label:"前期",
              backgroundColor:'rgba(242,100,100,.5)',
              borderColor:'rgb(242,100,100)',
              borderWidth: 1.5,
              outlierColor: '#999999',
              padding: 10,
              itemRadius: 0,
              data: [data_c_0_arr,data_c_1_arr,data_c_2_arr],
            });
          }
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{labels:{fontSize:10,boxWidth:24}},
            title: {display:false},
            scales: {
              yAxes: [{
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:6,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              }],
              xAxes: [{
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  fontSize:8,
                  autoSkip: true,
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                }
              }]
            },
            tooltips:{
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              intersect:false,
              axis:'x',
              mode:'index',
            }
          }
          cate4_boxplot.data = {
            labels:["施術回数","純患数","新患数"],
            datasets:graph_data,
          };
          cate4_boxplot.options = graph_option;
          cate4_boxplot.update();
        }
        const desc_table = () => {
          let ap = ``;
          obj.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_2;
            let data_3 = cell.data_3;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);
              let rate_2 = data_2.to_perate(sum_data_2);
              let rate_3 = data_3.to_perate(sum_data_3);

              for (let i = 0;i < 4;i++) {
                app +=
                `
                <td>
                  <div class="amount">
                    ${eval(`data_${i}`).toLocaleString()}
                    <span class="percent">${eval(`rate_${i}`)}%</span>
                  </div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);
                let c_data_2 = c_cell.sum_val(`data_2`);
                let c_data_3 = c_cell.sum_val(`data_3`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();
                let rate_2 = data_2.to_rate(c_data_2).rate_str();
                let rate_3 = data_3.to_rate(c_data_3).rate_str();

                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                    </div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(0)</span>
                    </div>
                    <div class="rate">-%</div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `<tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=3&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });
          $('#cate4_table_base').html(
            `
            <table id="cate4_table">
              <thead>
                <tr>
                  <th></th>
                  <th>自費売上</th>
                  <th>施術回数</th>
                  <th>純患数</th>
                  <th>新患数</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#cate4_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }
        const desc_cus = () => {
          let sum_geneder_0 = obj.sum_val(`geneder_0`);
          let sum_geneder_1 = obj.sum_val(`geneder_1`);
          let sum_geneder_2 = obj.sum_val(`geneder_2`);
          let sum_geneder_3 = obj.sum_val(`geneder_3`);
          let sum_geneder_4 = obj.sum_val(`geneder_4`);
          let sum_geneder_5 = obj.sum_val(`geneder_5`);
          let sum_geneder_6 = obj.sum_val(`geneder_6`);
          let sum_geneder_7 = obj.sum_val(`geneder_7`);
          let sum_geneder_8 = obj.sum_val(`geneder_8`);
          let sum_geneder_9 = obj.sum_val(`geneder_9`);

          let ap = ``;
          obj.forEach((cell) => {
            let geneder_0 = cell.geneder_0;
            let geneder_1 = cell.geneder_1;
            let geneder_2 = cell.geneder_2;
            let geneder_3 = cell.geneder_3;
            let geneder_4 = cell.geneder_4;
            let geneder_5 = cell.geneder_5;
            let geneder_6 = cell.geneder_6;
            let geneder_7 = cell.geneder_7;
            let geneder_8 = cell.geneder_8;
            let geneder_9 = cell.geneder_9;


            let app = ``;

            if (!cpt) {
              for (let i = 0;i < 10;i++) {
                let geneder = eval(`geneder_${i}`);
                let sum_geneder = eval(`sum_geneder_${i}`);

                let rate = geneder.to_perate(sum_geneder);

                app +=
                `
                <td>
                  <div class="amount">${geneder.str_jp()} <span class="percent">${rate}%</span></div>
                  <div class="bb" style="width:${rate}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_geneder_0 = c_cell.sum_val(`geneder_0`);
                let c_geneder_1 = c_cell.sum_val(`geneder_1`);
                let c_geneder_2 = c_cell.sum_val(`geneder_2`);
                let c_geneder_3 = c_cell.sum_val(`geneder_3`);
                let c_geneder_4 = c_cell.sum_val(`geneder_4`);
                let c_geneder_5 = c_cell.sum_val(`geneder_5`);
                let c_geneder_6 = c_cell.sum_val(`geneder_6`);
                let c_geneder_7 = c_cell.sum_val(`geneder_7`);
                let c_geneder_8 = c_cell.sum_val(`geneder_8`);
                let c_geneder_9 = c_cell.sum_val(`geneder_9`);

                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  let c_geneder = eval(`c_geneder_${i}`);

                  let rate = geneder.to_rate(c_geneder).rate_str();
                  app +=
                  `
                  <td>
                    <div class="amount">${geneder.str_jp()} <span>(${c_geneder.toLocaleString()})</span></div>
                    <div class="rate">${rate}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 10;i++) {
                  app +=
                  `
                  <td>
                    <div class="rate">-%</div>
                    <div class="amount">${eval(`data_${i}`).toLocaleString()} <span>(0)</span></div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `<tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=3&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });

          $('#cate4_customer_table_base').html(
            `
            <table id="cate4_customer_table">
              <thead>
                <tr>
                  <th></th>
                  <th>未成年 男性</th>
                  <th>未成年 女性</th>
                  <th>20~34歳 男性</th>
                  <th>20~34歳 女性</th>
                  <th>34~64歳 男性</th>
                  <th>34~64歳 女性</th>
                  <th>65~74歳 男性</th>
                  <th>65~74歳 女性</th>
                  <th>75歳~ 男性</th>
                  <th>75歳~ 女性</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#cate4_customer_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10]}],
            displayLength:5,
            lengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            paging: true,
            order:[[1,"desc"]]
          });
        }

        setTimeout(() => {
          desc_pie();
          setTimeout(() => {
            desc_plot();
          },500);
        },250);
        desc_table();
        desc_cus();
      }
      const desc_cate5 = () => {
        let obj = data.data.ct5;
        let c_obj = data.cdata.ct5;

        if (!obj.exist_val()) return;

        let sum_data_0 = obj.sum_val(`data_0`);
        let sum_data_1 = obj.sum_val(`data_1`);

        const desc_pie = () => {
          let data_arr = [];
          for (let i = 0;i < 5;i++) {
            if (i >= obj.length) continue;
            let cell = obj[i];
            data_arr.push(cell.data_0);
          }
          if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

          let graph_plugin = {
            afterDatasetsDraw: function (chart, easing) {
              var ctx = chart.ctx;
              chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                  meta.data.forEach(function (element, index) {
                    ctx.fillStyle = "white";
                    var fontSize = 8;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    let amount = data_arr[index].to_perate(sum_data_0);
                    var dataString =
                    amount > 0 ? [`${amount}%`] : [``];
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                  });
                }
              });
            }
          }
          let graph_data = [{
            data:data_arr,
            backgroundColor:pgca,
            borderColor:"",
            borderWidth:0,
          }];
          let graph_option = {
            maintainAspectRatio: true,
            responsive: true,
            cutoutPercentage:0,
            title: {display:false,fontSize:12,fontStyle:500,text: ''},
            pieceLabel: {render: 'label',position: 'outside'},
            tooltips:{
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  let name = index != 5 ? obj[index].obj_name : `その他`;
                  return `${name}`;
                },
                label: function(t,d) {
                  let index = t.index;
                  let amount = data_arr[index];
                  return `${amount.toLocaleString()}回`;
                }
              }
            }
          }
          cate5_pie.data = {
            labels:"",
            datasets:graph_data,
          };
          cate5_pie.config.plugins = [graph_plugin];
          cate5_pie.options = graph_option;
          cate5_pie.update();
        }
        const desc_table = () => {
          let ap = ``;
          obj.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;

            let app = ``;

            if (!cpt) {
              let rate_0 = data_0.to_perate(sum_data_0);
              let rate_1 = data_1.to_perate(sum_data_1);

              for (let i = 0;i < 2;i++) {
                app +=
                `
                <td>
                  <div class="amount">
                    ${eval(`data_${i}`).toLocaleString()}
                    <span class="percent">${eval(`rate_${i}`)}%</span>
                  </div>
                  <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_data_0 = c_cell.sum_val(`data_0`);
                let c_data_1 = c_cell.sum_val(`data_1`);

                let rate_0 = data_0.to_rate(c_data_0).rate_str();
                let rate_1 = data_1.to_rate(c_data_1).rate_str();

                for (let i = 0;i < 2;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                    </div>
                    <div class="rate">${eval(`rate_${i}`)}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 2;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span>(0)</span>
                    </div>
                    <div class="rate">-%</div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `<tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=4&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });
          $('#cate5_table_base').html(
            `
            <table id="cate5_table">
              <thead>
                <tr>
                  <th></th>
                  <th>合計回数</th>
                  <th>合計金額</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#cate5_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }
        const desc_cus = () => {
          let sum_geneder_0 = obj.sum_val(`geneder_0`);
          let sum_geneder_1 = obj.sum_val(`geneder_1`);
          let sum_geneder_2 = obj.sum_val(`geneder_2`);
          let sum_geneder_3 = obj.sum_val(`geneder_3`);
          let sum_geneder_4 = obj.sum_val(`geneder_4`);
          let sum_geneder_5 = obj.sum_val(`geneder_5`);
          let sum_geneder_6 = obj.sum_val(`geneder_6`);
          let sum_geneder_7 = obj.sum_val(`geneder_7`);
          let sum_geneder_8 = obj.sum_val(`geneder_8`);
          let sum_geneder_9 = obj.sum_val(`geneder_9`);

          let ap = ``;
          obj.forEach((cell) => {
            let geneder_0 = cell.geneder_0;
            let geneder_1 = cell.geneder_1;
            let geneder_2 = cell.geneder_2;
            let geneder_3 = cell.geneder_3;
            let geneder_4 = cell.geneder_4;
            let geneder_5 = cell.geneder_5;
            let geneder_6 = cell.geneder_6;
            let geneder_7 = cell.geneder_7;
            let geneder_8 = cell.geneder_8;
            let geneder_9 = cell.geneder_9;


            let app = ``;

            if (!cpt) {
              for (let i = 0;i < 10;i++) {
                let geneder = eval(`geneder_${i}`);
                let sum_geneder = eval(`sum_geneder_${i}`);

                let rate = geneder.to_perate(sum_geneder);

                app +=
                `
                <td>
                  <div class="amount">${geneder.str_jp()} <span class="percent">${rate}%</span></div>
                  <div class="bb" style="width:${rate}%;"></div>
                </td>
                `;
              }
            } else {
              let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
              if (c_cell.exist_val()) {
                let c_geneder_0 = c_cell.sum_val(`geneder_0`);
                let c_geneder_1 = c_cell.sum_val(`geneder_1`);
                let c_geneder_2 = c_cell.sum_val(`geneder_2`);
                let c_geneder_3 = c_cell.sum_val(`geneder_3`);
                let c_geneder_4 = c_cell.sum_val(`geneder_4`);
                let c_geneder_5 = c_cell.sum_val(`geneder_5`);
                let c_geneder_6 = c_cell.sum_val(`geneder_6`);
                let c_geneder_7 = c_cell.sum_val(`geneder_7`);
                let c_geneder_8 = c_cell.sum_val(`geneder_8`);
                let c_geneder_9 = c_cell.sum_val(`geneder_9`);

                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  let c_geneder = eval(`c_geneder_${i}`);

                  let rate = geneder.to_rate(c_geneder).rate_str();
                  app +=
                  `
                  <td>
                    <div class="amount">${geneder.str_jp()} <span>(${c_geneder.toLocaleString()})</span></div>
                    <div class="rate">${rate}</div>
                  </td>
                  `;
                }
              } else {
                for (let i = 0;i < 10;i++) {
                  app +=
                  `
                  <td>
                    <div class="rate">-%</div>
                    <div class="amount">${eval(`data_${i}`).toLocaleString()} <span>(0)</span></div>
                  </td>
                  `;
                }
              }
            }
            ap +=
            `<tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=4&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              ${app}
            </tr>
            `;
          });

          $('#cate5_customer_table_base').html(
            `
            <table id="cate5_customer_table">
              <thead>
                <tr>
                  <th></th>
                  <th>未成年 男性</th>
                  <th>未成年 女性</th>
                  <th>20~34歳 男性</th>
                  <th>20~34歳 女性</th>
                  <th>34~64歳 男性</th>
                  <th>34~64歳 女性</th>
                  <th>65~74歳 男性</th>
                  <th>65~74歳 女性</th>
                  <th>75歳~ 男性</th>
                  <th>75歳~ 女性</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#cate5_customer_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10]}],
            displayLength:5,
            lengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            paging: true,
            order:[[1,"desc"]]
          });
        }

        setTimeout(() => {
          desc_pie();
        },250);
        desc_table();
        desc_cus();
      }
      const desc_cate6 = () => {
        let obj = data.data.ct6;

        if (!obj.exist_val()) return;

        let sum_data_0 = obj.sum_val(`data_0`);
        let sum_data_1 = obj.sum_val(`data_1`);
        let sum_data_2 = obj.sum_val(`data_2`);
        let sum_data_3 = obj.sum_val(`data_3`);
        let sum_data_4 = obj.sum_val(`data_4`);

        const desc_leveling = () => {
          let data_arr = [];
          let step_rate_arr = [];
          let la = [];
          let color_arr = [];

          const desc_leveling = () => {
            let sum_data_0 = obj.sum_val(`data_0`);
            let step = 0;
            let top_sum = 0;
            obj.forEach((cell,idx) => {
              let amount = cell.data_0;
              top_sum += amount;
              let rate = amount.to_perate(sum_data_0);
              step += rate;
              if (step > 100) step = 100;

              if (step <= 70) {
                cell.group = 1;
                color_arr.push(`rgba(54,100,180,.8)`);
              } else if (step <= 90) {
                cell.group = 2;
                color_arr.push(`rgba(255,165,0,.8)`);
              } else if (step <= 95){
                cell.group = 3;
                color_arr.push(`rgba(242,100,100,.8)`);
              } else {
                cell.group = 4;
                color_arr.push(`rgba(255,0,0,1)`);
              }

              if (idx <= 49) {
                la.push(idx + 1);
                data_arr.push(amount);
                step_rate_arr.push(step.to_Perate(1));
              }
            });

            if (obj.length >= 51) {
              la.push(51);
              let amount = sum_data_0 - top_sum;
              let rate = amount.to_perate(sum_data_0);
              step += rate;
              data_arr.push(amount);
              step_rate_arr.push(step.to_Perate(1));
            }
          }
          const desc_line = () => {
            let graph_data = [{
              type:"LineWithLine",
              label:"累積売上割合",
              data:step_rate_arr,
              backgroundColor:"#fff",
              borderColor:"rgba(242,100,100,.8)",
              pointRadius:2,
              borderWidth:1,
              fill:false,
              yAxisID: "y-axis-1",
              cubicInterpolationMode: 'monotone',
              lineTension : 0
            },{
              type:"bar",
              label:"自費売上",
              data:data_arr,
              backgroundColor:color_arr,
              borderWidth:0,
              pointBackgroundColor:"#fff",
              fill:true,
              yAxisID: "y-axis-0",
              cubicInterpolationMode: 'monotone',
              lineTension: 0
            }];
            let graph_option = {
              maintainAspectRatio:true,
              responsive: true,
              legend:{
                labels:{
                  fontSize:10,
                  boxWidth:24
                }
              },
              title: {display:false,fontSize:12,text:"",},
              elements: {
                point:{radius:0}
              },
              scales: {
                yAxes: [{
                  id: "y-axis-0",
                  type: "linear",
                  position: "left",
                  gridLines: {
                    display:false,
                    drawBorder: false,
                    zeroLineColor:"#eee",
                    color:"#eee"
                  },
                  ticks: {
                    min:0,
                    autoSkip: true,
                    fontSize:8,
                    maxTicksLimit:4,
                    callback: function(label, index, labels) {
                      return label.str_jp();
                    }
                  },
                },{
                  id: "y-axis-1",
                  type: "linear",
                  position: "right",
                  gridLines: {
                    display:true,
                    drawBorder: false,
                    zeroLineColor:"#eee",
                    color:[
                      "#ddd",
                      "rgba(203,89,37,.6)",
                      "#ddd",
                      "rgba(18,83,164,.6)",
                      "#ddd",
                      "#ddd",
                      "#ddd",
                      "#ddd",
                      "#ddd",
                      "#ddd"
                    ],
                  },
                  ticks: {
                    min:0,
                    max:100,
                    autoSkip: true,
                    fontSize:8,
                    callback: function(label, index, labels) {
                      return `${label}%`;
                    }
                  },
                }],
                xAxes: [{
                  barPercentage: 1,
                  categoryPercentage:1,
                  ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    min:0,
                    fontSize:8,
                    autoSkip: true,
                    maxTicksLimit:8,
                  },
                  gridLines: {
                    display:false,
                    drawBorder: false,
                  },
                  scaleLabel: {
                    display: false,
                  }
                }]
              },
              tooltips: {
                bodySpacing:5,
                titleFontSize:12.5,
                bodyFontSize:15,
                intersect:false,
                axis:'x',
                mode:'index',
                callbacks: {
                  title:function(t,d) {
                    let index = t[0].index;
                    let name = obj[index].obj_name;
                    if (index == 50) return `その他${obj.length - 50}項目`;
                    else return `売上高第${index + 1}位 : ${name}`;
                  },
                  label:function(t,d) {
                    let index = t.index;
                    let id = t.datasetIndex;
                    let ar = ["累計比","自費売上"];
                    let dim_ar = ["%","円"];
                    let amount = (Math.round(t.yLabel * 100) / 100);
                    return `${ar[id]} : ${amount} ${dim_ar[id]}`;
                  }
                }
              }
            }
            cate6_line.data = {
              labels:la,
              datasets:graph_data
            };
            cate6_line.options = graph_option;
            cate6_line.update();
          }
          const desc_scatter = () => {
            let data_arr = [];
            const desc_leveling = () => {
              let color_arr = [`rgba(54,100,180,.8)`,`rgba(255,165,0,.8)`,`rgba(242,100,100,1)`,`rgb(255,0,0)`];
              let size_arr = [10,8,6,4];
              for (let i = 1;i <= 4;i++) {
                let obj_arr = [];

                let result = obj.filter(({group}) => group == i);
                result.forEach((cell,idx) => {
                  cell.index = idx;

                  let mado = cell.data_0;
                  let menu = cell.data_1;
                  let hour = cell.data_4;

                  if (menu != 0 && mado != 0) {
                    let data_0 = mado.to_devide(hour);
                    let data_1 = menu;

                    obj_arr.push({x:data_0,y:data_1});
                  }
                });

                data_arr.push({
                  label:`グループ${i}`,
                  data: obj_arr,
                  pointRadius: size_arr[i - 1],
                  pointHoverRadius: size_arr[i - 1],
                  borderColor:color_arr[i - 1],
                  backgroundColor:color_arr[i - 1],
                  fill:false,
                  hidden:eval(`${i == 1 || i == 2 ? false : true}`)
                });
              }
            }
            const desc_graph = () => {
              let graph_data = data_arr;
              let graph_option = {
                title: {
                  display: false,
                  fontSize:10,
                  text: '属性別表マップ'
                },
                legend:{labels:{fontSize:10,boxWidth:12}},
                scales: {
                  xAxes: [{
                    scaleLabel: {
                      display:true,
                      fontSize:10,
                      labelString: '時間単価'
                    },
                    ticks: {
                      fontSize:8,
                      maxTicksLimit:5,
                      callback: function(label, index, labels) {
                        return label.str_jp();
                      }
                    },
                    gridLines: {
                      zeroLineColor:"#eee",
                      drawBorder: false
                    },
                  }],
                  yAxes: [{
                    scaleLabel: {
                      display:true,
                      fontSize:10,
                      labelString: '施術数'
                    },
                    ticks: {
                      minRotation:0,
                      maxRotation:0,
                      fontSize:8,
                      maxTicksLimit:5,
                      callback: function(label, index, labels) {
                        return label.str_jp();
                      }
                    },
                    gridLines: {
                      zeroLineColor:"#eee",
                      drawBorder: false
                    },
                  }]
                },
                tooltips: {
                  bodySpacing:5,
                  titleFontSize:12.5,
                  bodyFontSize:15,
                  intersect:false,
                  callbacks: {
                    title:function(t,d) {
                      let data_index = t[0].datasetIndex;
                      let index = t[0].index;

                      let result = obj.filter((cell) => cell.group == (data_index + 1) && cell.index == index)[0];
                      return result.obj_name;
                    },
                    label:function(t,d) {
                      let index = t.index;
                      let id = t.datasetIndex;

                      let amount = t.xLabel;
                      let menu = t.yLabel;
                      return `時間単価 ¥${amount.toLocaleString()} 施術回数 ${menu.toLocaleString()}回`;
                    }
                  }
                }
              }
              cate6_pie.data = {datasets:graph_data};
              cate6_pie.options = graph_option;
              cate6_pie.update();
            }

            desc_leveling();
            desc_graph();
          }

          desc_leveling();
          desc_line();
          desc_scatter();
        }
        const desc_menu_table = () => {
          let ap = ``;
          let result = [] = obj;

          result.forEach((cell) => {
            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_3;
            let data_4 = cell.data_4;
            let cup = data_0.to_devide(data_1);
            let hup = data_0.to_devide(data_4);

            let rate_0 = data_0.to_perate(sum_data_0);
            let rate_1 = data_1.to_perate(sum_data_1);
            let rate_2 = data_2.to_perate(sum_data_3);
            ap +=
            `
            <tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=4&ms=true&mi=${cell.obj_id}">
                  ${cell.obj_name}
                </a>
              </th>
              <td>
                ${data_0.toLocaleString()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
              </td>
              <td>
                ${data_1.toLocaleString()}
                <span>(${rate_1}%)</span>
                <div class="bb" style="width:${rate_1}%;"></div>
              </td>
              <td>
                ${data_2.toLocaleString()}
                <span>(${rate_2}%)</span>
                <div class="bb" style="width:${rate_2}%;"></div>
              </td>
              <td>
                ${cup.toLocaleString()}
              </td>
              <td>
                ${hup.toLocaleString()}
              </td>
            </tr>
            `;
          });
          $('#menu_table_base').html(
            `
            <table id="menu_table">
              <thead>
                <tr>
                  <th></th>
                  <th>自費売上</th>
                  <th>施術数</th>
                  <th>新患数</th>
                  <th>施術単価</th>
                  <th>時間単価</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#menu_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5]}],
            displayLength:10,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            order:[[1,"desc"]]
          });
        }
        const desc_group = () => {
          let sum_menu = obj.length;

          let sum_data_1 = obj.sum_val(`data_1`);
          let sum_data_2 = obj.sum_val(`data_2`);
          let sum_data_3 = obj.sum_val(`data_3`);
          let sum_data_4 = obj.sum_val(`data_4`);

          const desc_mg1 = () => {
            let result = obj.filter(({group}) => group == 1);
            const desc_summary = () => {
              let ap = ``;
              (() => {
                let amount = result.length;
                let rate = amount.to_perate(sum_menu);
                ap +=
                `
                <div class="row">
                  <div class="indi">品目数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgba(54,100,180,1);"></div></div>
                  </div>
                </div>
                `;
              })();
              (() => {
                let amount = result.sum_val(`data_1`);
                let rate = amount.to_perate(sum_data_1);
                ap +=
                `
                <div class="row">
                  <div class="indi">施術回数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgba(54,100,180,1);"></div></div>
                  </div>
                </div>
                    `;
              })();
              (() => {
                let amount = result.sum_val(`data_4`);
                let rate = amount.to_perate(sum_data_4);
                ap +=
                `
                <div class="row">
                  <div class="indi">施術時間</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgba(54,100,180,1);"></div></div>
                  </div>
                </div>
                `;
              })();
              (() => {
                let amount = result.sum_val(`data_3`);
                let rate = amount.to_perate(sum_data_3);
                ap +=
                `
                <div class="row">
                  <div class="indi">新患数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgba(54,100,180,1);"></div></div>
                  </div>
                </div>
                `;
              })();
              $('#mg1_base').html(ap);
            }
            const desc_table = () => {
              let ap = ``;
              result.forEach((cell) => {
                let amount = cell.data_0;
                let rate = amount.to_perate(sum_data_0);
                ap +=
                `
                <tr>
                  <th>
                    <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=4&ms=true&mi=${cell.obj_id}">
                      ${cell.obj_name}
                    </a>
                  </th>
                  <td>
                    ${amount.toLocaleString()}
                    <span>(${rate}%)</span>
                    <div class="bb" style="width:${rate}%;"></div>
                  </td>
                </tr>
                `;
              });
              $('#mg1_table_base').html(
                `
                <table id="mg1_table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>自費売上</th>
                    </tr>
                  </thead>
                  <tbody>${ap}</tbody>
                </table>
                `
              );
              let table = $('#mg1_table').DataTable({
                columnDefs:[{type:'currency',targets:[1]}],
                displayLength:10,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
                paging: true,
                order:[[1,"desc"]]
              });
            }

            desc_summary();
            desc_table();
          }
          const desc_mg2 = () => {
            let result = obj.filter(({group}) => group == 2);
            const desc_summary = () => {
              let ap = ``;
              (() => {
                let amount = result.length;
                let rate = amount.to_perate(sum_menu);
                ap +=
                `
                <div class="row">
                  <div class="indi">品目数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgb(244,165,0);"></div></div>
                  </div>
                </div>
                    `;
              })();
              (() => {
                let amount = result.sum_val(`data_1`);
                let rate = amount.to_perate(sum_data_1);
                ap +=
                `
                <div class="row">
                  <div class="indi">施術回数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgb(244,165,0);"></div></div>
                  </div>
                </div>
                    `;
              })();
              (() => {
                let amount = result.sum_val(`data_4`);
                let rate = amount.to_perate(sum_data_4);
                ap +=
                `
                <div class="row">
                  <div class="indi">施術時間</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgb(244,165,0);"></div></div>
                  </div>
                </div>
                `;
              })();
              (() => {
                let amount = result.sum_val(`data_3`);
                let rate = amount.to_perate(sum_data_3);
                ap +=
                `
                <div class="row">
                  <div class="indi">新患数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgb(244,165,0);"></div></div>
                  </div>
                </div>
                `;
              })();
              $('#mg2_base').html(ap);
            }
            const desc_table = () => {
              let ap = ``;
              result.forEach((cell) => {
                let amount = cell.data_0;
                let rate = amount.to_perate(sum_data_0);
                ap +=
                `
                <tr>
                  <th>
                    <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=4&ms=true&mi=${cell.obj_id}">
                      ${cell.obj_name}
                    </a>
                  </th>
                  <td>
                    ${amount.toLocaleString()}
                    <span>(${rate}%)</span>
                    <div class="bb" style="width:${rate}%;"></div>
                  </td>
                </tr>
                `;
              });
              $('#mg2_table_base').html(
                `
                <table id="mg2_table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>自費売上</th>
                    </tr>
                  </thead>
                  <tbody>${ap}</tbody>
                </table>
                `
              );
              let table = $('#mg2_table').DataTable({
                columnDefs:[{type:'currency',targets:[1]}],
                displayLength:10,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
                paging: true,
                order:[[1,"desc"]]
              });
            }

            desc_summary();
            desc_table();
          }
          const desc_mg3 = () => {
            let result = obj.filter(({group}) => group == 3);
            const desc_summary = () => {
              let ap = ``;

              (() => {
                let amount = result.length;
                let rate = amount.to_perate(sum_menu);
                ap +=
                `
                <div class="row">
                  <div class="indi">品目数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgb(242,100,100);"></div></div>
                  </div>
                </div>
                    `;
              })();
              (() => {
                let amount = result.sum_val(`data_1`);
                let rate = amount.to_perate(sum_data_1);
                ap +=
                `
                <div class="row">
                  <div class="indi">施術回数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgb(242,100,100);"></div></div>
                  </div>
                </div>
                    `;
              })();
              (() => {
                let amount = result.sum_val(`data_4`);
                let rate = amount.to_perate(sum_data_4);
                ap +=
                `
                <div class="row">
                  <div class="indi">施術時間</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgb(242,100,100);"></div></div>
                  </div>
                </div>
                `;
              })();
              (() => {
                let amount = result.sum_val(`data_3`);
                let rate = amount.to_perate(sum_data_3);
                ap +=
                `
                <div class="row">
                  <div class="indi">新患数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:rgb(242,100,100);"></div></div>
                  </div>
                </div>
                `;
              })();
              $('#mg3_base').html(ap);
            }
            const desc_table = () => {
              let ap = ``;
              result.forEach((cell) => {
                let amount = cell.data_0;
                let rate = amount.to_perate(sum_data_0);
                ap +=
                `
                <tr>
                  <th>
                    <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=4&ms=true&mi=${cell.obj_id}">
                      ${cell.obj_name}
                    </a>
                  </th>
                  <td>
                    ${amount.toLocaleString()}
                    <span>(${rate}%)</span>
                    <div class="bb" style="width:${rate}%;"></div>
                  </td>
                </tr>
                `;
              });
              $('#mg3_table_base').html(
                `
                <table id="mg3_table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>自費売上</th>
                    </tr>
                  </thead>
                  <tbody>${ap}</tbody>
                </table>
                `
              );
              let table = $('#mg3_table').DataTable({
                columnDefs:[{type:'currency',targets:[1]}],
                displayLength:10,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
                paging: true,
                order:[[1,"desc"]]
              });
            }

            desc_summary();
            desc_table();
          }
          const desc_mg4 = () => {
            let result = obj.filter(({group}) => group == 4);
            const desc_summary = () => {
              let ap = ``;

              (() => {
                let amount = result.length;
                let rate = amount.to_perate(sum_menu);
                ap +=
                `
                <div class="row">
                  <div class="indi">品目数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:red;"></div></div>
                  </div>
                </div>
                    `;
              })();
              (() => {
                let amount = result.sum_val(`data_1`);
                let rate = amount.to_perate(sum_data_1);
                ap +=
                `
                <div class="row">
                  <div class="indi">施術回数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:red;"></div></div>
                  </div>
                </div>
                    `;
              })();
              (() => {
                let amount = result.sum_val(`data_4`);
                let rate = amount.to_perate(sum_data_4);
                ap +=
                `
                <div class="row">
                  <div class="indi">施術時間</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:red;"></div></div>
                  </div>
                </div>
                `;
              })();
              (() => {
                let amount = result.sum_val(`data_3`);
                let rate = amount.to_perate(sum_data_3);
                ap +=
                `
                <div class="row">
                  <div class="indi">新患数</div>
                  <div class="contents">
                    ${amount.toLocaleString()}
                    <div class="rate">${rate}%</div>
                    <div class="bb"><div class="b" style="width:${rate}%;background-color:red;"></div></div>
                  </div>
                </div>
                `;
              })();
              $('#mg4_base').html(ap);
            }
            const desc_table = () => {
              let ap = ``;
              result.forEach((cell) => {
                let amount = cell.data_0;
                let rate = amount.to_perate(sum_data_0);
                ap +=
                `
                <tr>
                  <th>
                    <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=4&ms=true&mi=${cell.obj_id}">
                      ${cell.obj_name}
                    </a>
                  </th>
                  <td>
                    ${amount.toLocaleString()}
                    <span>(${rate}%)</span>
                    <div class="bb" style="width:${rate}%;"></div>
                  </td>
                </tr>
                `;
              });
              $('#mg4_table_base').html(
                `
                <table id="mg4_table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>自費売上</th>
                    </tr>
                  </thead>
                  <tbody>${ap}</tbody>
                </table>
                `
              );
              let table = $('#mg4_table').DataTable({
                columnDefs:[{type:'currency',targets:[1]}],
                displayLength:10,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
                paging: true,
                order:[[1,"desc"]]
              });
            }

            desc_summary();
            desc_table();
          }

          desc_mg1();
          desc_mg2();
          desc_mg3();
          desc_mg4();
        }

        desc_leveling();
        desc_menu_table();
        desc_group();
      }

      desc_cate();
      setTimeout(() => {
        desc_cate1();
        desc_cate2();
        desc_cate3();
        desc_cate4();
        desc_cate5();
        desc_cate6();
      },750);
    }

    desc_content_leveling();
    const desc_graph_init = (sender1,sender2,sender3,sender4) => {
      eval(`try {${sender1}.destroy();} catch(err) {}`);
      eval(`${sender2}.canvas.height = 100;`);
      eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
    }

    let trend_line;
    let cate_pie;
    let cate1_pie;
    let cate1_boxplot;
    let cate2_pie;
    let cate2_boxplot;
    let cate3_pie;
    let cate3_boxplot;
    let cate4_pie;
    let cate4_boxplot;
    let cate5_pie;
    let cate6_pie;
    let cate6_line;

    let trend_line_ctx = document.getElementById('trend_line').getContext('2d');
    desc_graph_init("trend_line","trend_line_ctx",'bar');
    let cate_pie_ctx = document.getElementById('cate_pie').getContext('2d');
    desc_graph_init("cate_pie","cate_pie_ctx",'pie');

    let cate1_pie_ctx = document.getElementById('cate1_pie').getContext('2d');
    desc_graph_init("cate1_pie","cate1_pie_ctx",'pie');
    let cate1_boxplot_ctx = document.getElementById('cate1_boxplot').getContext('2d');
    desc_graph_init("cate1_boxplot","cate1_boxplot_ctx",'boxplot');

    let cate2_pie_ctx = document.getElementById('cate2_pie').getContext('2d');
    desc_graph_init("cate2_pie","cate2_pie_ctx",'pie');
    let cate2_boxplot_ctx = document.getElementById('cate2_boxplot').getContext('2d');
    desc_graph_init("cate2_boxplot","cate2_boxplot_ctx",'boxplot');

    let cate3_pie_ctx = document.getElementById('cate3_pie').getContext('2d');
    desc_graph_init("cate3_pie","cate3_pie_ctx",'pie');
    let cate3_boxplot_ctx = document.getElementById('cate3_boxplot').getContext('2d');
    desc_graph_init("cate3_boxplot","cate3_boxplot_ctx",'boxplot');

    let cate4_pie_ctx = document.getElementById('cate4_pie').getContext('2d');
    desc_graph_init("cate4_pie","cate4_pie_ctx",'pie');
    let cate4_boxplot_ctx = document.getElementById('cate4_boxplot').getContext('2d');
    desc_graph_init("cate4_boxplot","cate4_boxplot_ctx",'boxplot');

    let cate5_pie_ctx = document.getElementById('cate5_pie').getContext('2d');
    desc_graph_init("cate5_pie","cate5_pie_ctx",'pie');

    let cate6_pie_ctx = document.getElementById('cate6_pie').getContext('2d');
    desc_graph_init("cate6_pie","cate6_pie_ctx",'scatter');
    let cate6_line_ctx = document.getElementById('cate6_line').getContext('2d');
    desc_graph_init("cate6_line","cate6_line_ctx",'bar');

    desc_static_sections();
  } else if (bt == 3) {
    const desc_content_leveling = () => {
      $('#content_base').html(
        `
        <div class="section">
          <div class="section_title">メニュー選択</div>
          <div class="setting_box inline">
            <input class="input_label" type="checkbox" id="setting_m">
            <label class="label_indi" for="setting_m" id="setting_menu_indi">
              <div class="cell inline"><i class="fad fa-folders"></i></div>
              <div class="cell inline">施術タイプ</div>
              <div class="cell inline">施術名</div>
              <div class="cell cell_indi inline"><i class="fas fa-caret-down"></i></div>
            </label>
            <div class="modal">
              <div class="modal_title">
                <i class="fas fa-cogs"></i> メニュー設定
                <label for="setting_m"><i class="fas fa-times"></i></label>
              </div>
              <div class="box">
                <div class="content">
                  <div class="osbb select_box" id="menusb">
                    <select id="menu_type_select">
                      <option value="0">大分類</option>
                      <option value="1">中分類</option>
                      <option value="2">小分類</option>
                      <option value="3">キーワード</option>
                      <option value="4">メニュー</option>
                    </select>
                    <div class="icon_base"><i class="fas fa-caret-down"></i></div>
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="content">
                  <div class="osbb select_box">
                    <select id="menu_select" class="menu_select">
                      ${sender_menus_so[0]}
                    </select>
                    <div class="icon_base"><i class="fas fa-caret-down"></i></div>
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="indi">比較</div>
                <div class="content">
                  ${cpt
                    ?　`<div class="osbb c_osbb select_box">
                      <select id="c_menu_select" class="menu_select">
                        ${sender_menus_so[0]}
                      </select>
                      <div class="icon_base"><i class="fas fa-caret-down"></i></div>
                    </div>`
                    : `比較しない`
                  }
                </div>
              </div>
              <div class="box_submit">
                <div class="indi"></div>
                <div class="content">
                  <div class="submit_base">
                    <button type="submit" id="menu_query_btn">適用する <i class="fas fa-caret-down"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section_title">客単価とLTV</div>
          <div class="unit_box" id="cup_ltv_box"></div>
        </div>
        <div class="section">
          <div class="section_title">
            売上と集客の概要
            <div class="icon inline">
              <i class="fas fa-question-circle help_tips" data-title="セルのクリック" data-help="各項目をクリックすると下の青帯セクションの値が更新されます。"></i>
            </div>
          </div>
          <div class="cell_btn_box" id="cell_btn_box"></div>
        </div>
        <div class="section">
          <div class="cells_box">
            <div class="cell cell_2x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">トレンドを見る
                  <div class="icon inline">
                    <i class="fas fa-question-circle help_tips" data-title="平均成長率" data-help="単位期間ごとの平均の成長線です。この値は各変動に依存するので回帰線とは無相関な値になる場合があります。"></i>
                  </div>
                  <div class="icon inline">
                    <i class="fas fa-question-circle help_tips" data-title="回帰直線とは?" data-help="回帰直線とは、散布図において予定値を求める際に用いられる直線のことです。2組のデータの中心的な分布傾向を表すもので、最小二乗法と呼ばれる算術を用いて求められます。この直線を用いることにより、現在のトレンドの傾向を捉えることができます。"></i>
                  </div>
                </div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="trend_line" width="250" height="100"></canvas>
                    </div>
                    <div class="rows">
                      <div class="row">
                        <div class="row_title">
                          <span class="icon inline"><i class="fad fa-ball-pile"></i></span> 累計
                          <div class="rate_amount" id="trend_r_amount"></div>
                        </div>
                        <div class="content" id="trend_amount">
                        </div>
                      </div>
                      <div class="row">
                        <div class="row_title">
                          <span class="icon inline"><i class="fas fa-chart-area"></i></span> 平均成長率
                          <div class="rate_amount" id="trend_r_regression"></div>
                        </div>
                        <div class="content" id="trend_regression">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box cell_link">
                <div class="cell_title cell_title_r text_overflow">トレンドの積分
                  <div class="icon inline">
                    <i class="fas fa-question-circle help_tips" data-title="トレンドの高次元グラフ" data-help="このグラフはトレンド図表を高次元展開した蓄積グラフです。各項目が積分された関数が表示されています。このセクションで言う成長線とはトレンド図の回帰線の積分関数です。"></i>
                  </div>
                </div>
                <div class="content _integral_">
                  <div class="base">
                    <div class="switch_base">
                      <input type="radio" name="integral_input_" id="integral_input_0" checked>
                      <label for="integral_input_0">
                        <i class="fas fa-wave-square"></i> 成長率
                      </label>
                      <input type="radio" name="integral_input_" id="integral_input_1">
                      <label for="integral_input_1">
                        <i class="fas fa-signal"></i> 累積
                      </label>
                    </div>
                    <div class="graph_wrap">
                      <canvas id="integral_line" width="150" height="100"></canvas>
                    </div>
                    <div class="row">
                      <div class="row_title">
                        <span class="icon inline"><i class="fas fa-chart-area"></i></span> 回帰
                        <div class="rate_amount" id="trend_r_accel"></div>
                      </div>
                      <div class="content" id="trend_accel">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">活動量は？</div>
                <div class="content _amount_box_">
                  <div class="base" id="cb_quantity"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">活動の効率は？</div>
                <div class="content _amount_box_">
                  <div class="base" id="cb_quality"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">曜日別の売上は？</div>
                <div class="content _week_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="week_line" width="250" height="100"></canvas>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">日</span></div>
                      <div class="amount" id="week_a_t0">--</div>
                      <div class="rate" id="week_r_t0">--%</div>
                      <div class="bar" id="week_b_t0"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">月</span></div>
                      <div class="amount" id="week_a_t1">--</div>
                      <div class="rate" id="week_r_t1">--%</div>
                      <div class="bar" id="week_b_t1"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">火</span></div>
                      <div class="amount" id="week_a_t2">--</div>
                      <div class="rate" id="week_r_t2">--%</div>
                      <div class="bar" id="week_b_t2"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">水</span></div>
                      <div class="amount" id="week_a_t3">--</div>
                      <div class="rate" id="week_r_t3">--%</div>
                      <div class="bar" id="week_b_t3"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">木</span></div>
                      <div class="amount" id="week_a_t4">--</div>
                      <div class="rate" id="week_r_t4">--%</div>
                      <div class="bar" id="week_b_t4"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">金</span></div>
                      <div class="amount" id="week_a_t5">--</div>
                      <div class="rate" id="week_r_t5">--%</div>
                      <div class="bar" id="week_b_t5"></div>
                    </div>
                    <div class="row">
                      <div class="row_title"><span class="icon inline">土</span></div>
                      <div class="amount" id="week_a_t6">--</div>
                      <div class="rate" id="week_r_t6">--%</div>
                      <div class="bar" id="week_b_t6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">施術の効果は？</div>
                <div class="content _source_">
                  <div class="base">
                    <div class="bar_row">
                      <div class="graph" id="source_bb">
                        <div class="bar_base inline">
                        </div>
                      </div>
                      <div class="indi">
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_0 inline"><i class="fas fa-square"></i></span> 完治
                          </div>
                          <div class="content" id="source_data0"></div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_1 inline"><i class="fas fa-square"></i></span> 既存
                          </div>
                          <div class="content" id="source_data1"></div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_2 inline"><i class="fas fa-square"></i></span> 新規
                          </div>
                          <div class="content" id="source_data2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客の属性は？</div>
                <div class="content _customer_">
                  <div class="base">
                    <div class="bar_row">
                      <div class="graph" id="customer_gender">
                        <div class="bar_base inline">
                        </div>
                      </div>
                      <div class="indi">
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_0 inline"><i class="fas fa-square"></i></span> 男性
                          </div>
                          <div class="content" id="customer_male">
                          </div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_1 inline"><i class="fas fa-square"></i></span> 女性
                          </div>
                          <div class="content" id="customer_female">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bar_row">
                      <div class="graph" id="customer_generation">
                        <div class="bar_base inline">
                        </div>
                      </div>
                      <div class="indi">
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_0 inline"><i class="fas fa-square"></i></span> 未成年
                          </div>
                          <div class="content" id="customer_age1">
                          </div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_1 inline"><i class="fas fa-square"></i></span> 成人
                          </div>
                          <div class="content" id="customer_age2">
                          </div>
                        </div>
                        <div class="mini_row">
                          <div class="row_title">
                            <span class="icon icon_2 inline"><i class="fas fa-square"></i></span> 高齢者
                          </div>
                          <div class="content" id="customer_age3">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">来店が多い時間帯は？</div>
                <div class="content _hour_">
                  <div class="base">
                    <div class="hour_graph" id="hour_graph_base">
                    </div>
                    <div class="week_indi" id="hour_week_indi"></div>
                    <div class="gradient_indi" id="hour_gradient_indi"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box">
                <div class="cell_title cell_title_r text_overflow">
                  一緒に施術されているものは？
                  <div class="icon inline">
                    <i class="fas fa-question-circle help_tips" data-title="客単価" data-help="ここでいう客単価とは対象の施術と各施術が共に行われた時の事です。"></i>
                  </div>
                </div>
                <div class="content _associate_">
                  <div class="base">
                    <div class="table_base no_border" id="associate_table_base">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_2x1 inline">
              <div class="box">
                <div class="cell_title cell_title_r text_overflow">アソシエーション
                  <div class="icon inline">
                    <i class="fas fa-question-circle help_tips" data-title="アソシエーションとは？" data-help="アソシエーション分析とは対象の商品と付随してよく売られている商品を分析する手法です。最終的に得られる「リフト値」とは値が1よりも大きい場合、対象商品とよく一緒に売られている商品となります。"></i>
                  </div>
                </div>
                <div class="content _association_">
                  <div class="base">
                    <div class="table_base no_border" id="association_table_base">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
      );
      let m_type = getDOM(`m_type`).value;
      $(`#menu_type_select option[value="${m_type}"]`).prop('selected',true);
      desc_menu_option(m_type);
      if (m_select) {
        let m_id = getDOM(`m_id`).value;
        $(`#menu_select option[value="${m_id}"]`).prop('selected',true);
      }
    }
    const desc_menu_content = (data) => {
      if (!data.data.data.exist_val()) {
        // $('#content_base').html(`<div class="loading_base inline">期間内データがありません。</div>`);
        alert(`期間内データがありませんでした。`);
        return;
      }

      let mt = $('#menu_type_select option:selected').prop('value');
      let mid = $('#menu_select option:selected').prop('value');
      let cmid = cpt ? $('#menu_c_select option:selected').prop('value') : 0;

      let data_length = data.data.data.length;
      let c_data_length = data.cdata.data.length;

      let datas = data.data.data;
      let c_datas = data.cdata.data;

      const desc_unit = () => {
        let name = sender_menus_objs[Number(mt)].filter(({id}) => id == mid)[0].name;
        let obj = data.data.unit[0];
        let data_0 = obj.data_0 || 0;
        let data_1 = obj.data_1 || 0;
        let data_2 = obj.data_2 || 0;

        let cup = data_2.to_devide(data_0);
        let ltv = data_2.to_devide(data_1);


        let c_obj = !cpt?data.data.all[0]:data.cdata.unit[0];
        let c_data_0 = c_obj.data_0 || 0;
        let c_data_1 = c_obj.data_1 || 0;
        let c_data_2 = !cpt?c_obj.data_3:c_obj.data_2 || 0;

        let c_cup = c_data_2.to_devide(c_data_0);
        let c_ltv = c_data_2.to_devide(c_data_1);

        let rate_cup = cup.to_rate(c_cup).rate_str();
        let rate_ltv = ltv.to_rate(c_ltv).rate_str();


        $('#cup_ltv_box').html(
          `
          <div class="row">
            <div class="left">
              <div class="title">${name}を受けた時の客単価</div>
              <div class="content">
                ¥${cup.toLocaleString()}
                <span>${rate_cup}</span>
              </div>
            </div>
            <div class="right">
              <div class="title">${!cpt?`全体の客単価`:`比較客単価`}</div>
              <div class="content">
                ¥${c_cup.toLocaleString()}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="left">
              <div class="title">${name}を受けている顧客のLTV</div>
              <div class="content">
                ¥${ltv.toLocaleString()}
                <span>${rate_ltv}</span>
              </div>
            </div>
            <div class="right">
              <div class="title">${!cpt?`全体のLTV`:`比較LTV`}</div>
              <div class="content">
                ¥${c_ltv.toLocaleString()}
              </div>
            </div>
          </div>
          `
        );
      }
      const desc_cells_btn = () => {
        var col_name = [
          "自費売上",
          "施術回数",
          "純患数",
          "新患数",
          "完治数",
          "稼働時間"
        ];
        var col_icon = [
          `<i class='fas fa-cash-register'></i>`,
          `<i class='fas fa-folder-open'></i>`,
          `<i class="fad fa-users"></i>`,
          `<i class="fas fa-user-plus"></i>`,
          `<i class="fas fa-heartbeat"></i>`,
          `<i class='fas fa-history'></i>`
        ];

        let ap = ``;
        for (let i = 0;i < 6;i++) {
          let amount = datas.sum_val(`data_${i}`);

          if (!cpt) {
            ap +=
            `
            <input type="radio" name="cell_input_" id="cell_input_${i}">
            <label class="cell inline" for="cell_input_${i}">
              <div class="box">
                <div class="cell_title">
                  <span class="icon inline">${col_icon[i]}</span> ${col_name[i]}
                </div>
                <div class="content">
                  <div class="amount text_overflow">
                    ${amount.str_jp()}
                  </div>
                </div>
              </div>
            </label>
            `;
          } else {
            let c_amount = c_datas.sum_val(`data_${i}`);
            let rate = amount.to_rate(c_amount).rate_str();

            ap +=
            `
            <input type="radio" name="cell_input_" id="cell_input_${i}">
            <label class="cell inline" for="cell_input_${i}">
              <div class="box">
                <div class="cell_title">
                  <span class="icon inline">${col_icon[i]}</span> ${col_name[i]}
                </div>
                <div class="content">
                  <div class="amount text_overflow">
                    ${amount.str_jp()}
                  </div>
                  <div class="c_amount text_overflow">
                    ${c_amount.str_jp()}
                  </div>
                  <div class="r_amount text_overflow">
                    ${rate}
                  </div>
                </div>
              </div>
            </label>
            `;
          }
        }
        $('#cell_btn_box').html(ap);
      }
      const desc_dynamic_sections = (ct) => {
        (() => {
          $(`#cell_input_${ct}`).prop('checked',true);
          $('.cell_link').addClass('select_shadow');
          setTimeout(() => {$('.cell_link').removeClass('select_shadow');},1000);
        })();

        const desc_trend_section = () => {
          let total = datas.sum_val(`data_${ct}`);
          let c_total = c_datas.sum_val(`data_${ct}`);
          let ave = total.to_Perate(pa.length);

          let tpl = [];

          let trend_data_arr = [];
          let trend_c_data_arr = [];
          let trend_regression_data = [];
          let trend_c_regression_data = [];

          let integral_data_arr = [];
          let integral_c_data_arr = [];
          let integral_ave_arr = [];
          let integral_rate_arr = [];
          let integral_c_rate_arr = [];
          let integral_regression_data = [];
          let integral_c_regression_data = [];
          let pointRadius_arr = [];

          let a = 0;
          let c_a = 0;

          const desc_leveling = () => {
            let sx = 0,sy = 0,sxy = 0,sxx = 0;
            let c_sx = 0,c_sy = 0,c_sxy = 0,c_sxx = 0;

            pa.forEach((label,idx) => {
              tpl.push(convert_pl(label,idx,pt));
              integral_ave_arr.push(ave * (idx + 1));
              idx == pa.length - 1 ? pointRadius_arr.push(5) : pointRadius_arr.push(0);

              let result = datas.filter(({period}) => period == label);
              let amount = result.sum_val(`data_${ct}`);

              trend_data_arr.push(amount);

              (() => {
                let a = amount.to_point(trend_data_arr[idx - 1]);
                if (isNaN(a)) a = 0;
                integral_rate_arr.push(a);
              })();

              idx == 0
                ? integral_data_arr.push(amount)
                : integral_data_arr.push(amount + integral_data_arr[idx - 1]);

              sx += idx + 1;
              sy += amount;
              sxy += (idx + 1) * amount;
              sxx += (idx + 1) * (idx + 1);

              if (cpt) {
                let c_label = cpa[idx];
                let c_result = c_datas.filter(({period}) => period == c_label);
                let c_amount = c_result.sum_val(`data_${ct}`) || 0;

                trend_c_data_arr.push(c_amount);

                (() => {
                  let a = c_amount.to_point(trend_c_data_arr[idx - 1]);
                  if (isNaN(a)) a = 0;
                  integral_c_rate_arr.push(a);
                })();

                idx == 0
                  ? integral_c_data_arr.push(c_amount)
                  : integral_c_data_arr.push(c_amount + integral_c_data_arr[idx - 1]);

                c_sx += idx + 1;
                c_sy += c_amount;
                c_sxy += (idx + 1) * c_amount;
                c_sxx += (idx + 1) * (idx + 1);
              }
            });

            const calc_regression = () => {
              let n = pa.length;
              let y_ave = sy / n;
              let x_ave = sx / n;
              let x_multi = sxx;
              let Sxx = x_multi - n * x_ave * x_ave;
              let Sxy = sxy - n * y_ave * x_ave;
              a = Sxy / Sxx;
              let b = y_ave - a * x_ave;

              pa.forEach((cell,idx) =>  {
                let amount = b + a*idx;
                let sum = integral_regression_data[idx - 1];
                trend_regression_data.push(amount);
                idx == 0
                  ? integral_regression_data.push(amount)
                  : integral_regression_data.push(amount + sum);
              });

              if (cpt) {
                let c_n = cpa.length;
                let c_y_ave = c_sy / c_n;
                let c_x_ave = c_sx / c_n;
                let c_x_multi = c_sxx;
                let c_Sxx = c_x_multi - c_n * c_x_ave * c_x_ave;
                let c_Sxy = c_sxy - c_n * c_y_ave * c_x_ave;
                c_a = c_Sxy / c_Sxx;
                let c_b = c_y_ave - c_a * c_x_ave;

                cpa.forEach((cell,idx) =>  {
                  let amount = c_b + c_a*idx;
                  let sum = integral_c_regression_data[idx - 1];
                  trend_c_regression_data.push(amount);
                  idx == 0
                    ? integral_c_regression_data.push(amount)
                    : integral_c_regression_data.push(amount + sum);
                });
              }
            }
            calc_regression();
          }
          const desc_trend = () => {
            const desc_line = () => {
              let graph_data = [{
                type:"LineWithLine",
                label:"当期",
                data:trend_data_arr,
                backgroundColor:`rgba(54,100,180,.05)`,
                borderColor:"rgba(54,100,180,1)",
                borderWidth:1.5,
                pointRadius:4,
                pointBackgroundColor:"#fff",
                fill:true,
                yAxisID: "y-axis-0",
                cubicInterpolationMode: 'monotone',
                lineTension: 0
              },{
                type:"LineWithLine",
                label:"回帰線",
                data:trend_regression_data,
                backgroundColor:`rgba(66,113,244,.05)`,
                borderColor:`rgba(66,113,244,1)`,
                pointRadius:0,
                borderWidth:1,
                fill:false,
                yAxisID: "y-axis-0",
                cubicInterpolationMode: 'monotone',
                lineTension : 0
              }];
              if (cpt) {
                graph_data.push({
                  type:"LineWithLine",
                  label:"比較",
                  data:trend_c_data_arr,
                  backgroundColor:"#fff",
                  borderColor:"rgba(242,100,100,1)",
                  borderWidth:1.5,
                  pointRadius:4,
                  fill:false,
                  yAxisID: "y-axis-0",
                  cubicInterpolationMode: 'monotone',
                  lineTension: 0
                },{
                  type:"LineWithLine",
                  label:"比較回帰線",
                  data:trend_c_regression_data,
                  backgroundColor:`rgba(255,165,0,.05)`,
                  borderColor:`rgba(255,165,0,1)`,
                  pointRadius:0,
                  borderWidth:1,
                  fill:false,
                  yAxisID: "y-axis-0",
                  cubicInterpolationMode: 'monotone',
                  lineTension : 0
                })
              }
              let graph_option = {
                maintainAspectRatio:true,
                responsive: true,
                legend:{
                  labels:{
                    fontSize:10,
                    boxWidth:24
                  }
                },
                title: {display:false,fontSize:12,text:"",},
                elements: {
                  point:{radius:0}
                },
                scales: {
                  yAxes: [{
                    id: "y-axis-0",
                    type: "linear",
                    position: "left",
                    gridLines: {
                      display:true,
                      drawBorder: false,
                      zeroLineColor:"#eee",
                      color:"#eee"
                    },
                    ticks: {
                      min:0,
                      autoSkip: true,
                      fontSize:8,
                      maxTicksLimit:4,
                      callback: function(label, index, labels) {
                        return label.str_jp();
                      }
                    },
                  }],
                  xAxes: [{
                    barPercentage: .9,
                    categoryPercentage:1,
                    ticks: {
                      maxRotation: 0,
                      minRotation: 0,
                      min:0,
                      fontSize:8,
                      autoSkip: true,
                      maxTicksLimit:8,
                    },
                    gridLines: {
                      display:false,
                      drawBorder: false,
                    },
                    scaleLabel: {
                      display: false,
                    }
                  }]
                },
                tooltips: {
                  bodySpacing:5,
                  titleFontSize:12.5,
                  bodyFontSize:15,
                  intersect:false,
                  axis:'x',
                  mode:'index',
                  callbacks: {
                    title:function(t,d) {
                      let index = t[0].index;
                      let period = pa[index];
                      period = period == undefined ? `0000-00-00` : period;
                      return `${period.str_date(`.`)}`;
                    },
                    label:function(t,d) {
                      let index = t.index;
                      let idx = t.datasetIndex;
                      if (idx == 1 || idx == 3) {return;}
                      let amount = t.yLabel;
                      let ar = ["当期","","比較",""];
                      return `${ar[idx]} ${amount.toLocaleString()}`;
                    }
                  }
                }
              }
              trend_line.data = {
                labels:tpl,
                datasets:graph_data
              };
              trend_line.options = graph_option;
              trend_line.update();
            }
            const desc_details = () => {
              let par = ["日","週","月"];
              let reg_rate = (integral_rate_arr.sum_val(``) / integral_rate_arr.length).to_rate(1);

              if (!cpt) {
                $('#trend_amount').html(`<div class="amount">${total.toLocaleString()}</div>`);
                $('#trend_regression').html(`<div class="amount">${reg_rate.rate_str()}<span class="indi">/${par[pt]}</span></div>`);
              } else {
                let reg_c_rate = (integral_c_rate_arr.sum_val(``) / integral_c_rate_arr.length).to_rate(1);
                let amount_rate = total.to_rate(c_total).rate_str();

                let c_rate =  (reg_rate - reg_c_rate).margin_str(``);

                $('#trend_amount').html(
                  `
                  <div class="amount">${total.toLocaleString()}</div>
                  <div class="c_amount">${c_total.toLocaleString()}</div>
                  `
                );
                $('#trend_regression').html(
                  `
                  <div class="amount">${reg_rate.rate_str()}<span class="indi">/${par[pt]}</span></div>
                  <div class="c_amount">${reg_c_rate.rate_str()}<span class="indi">/${par[pt]}</span></div>
                  `
                );
                $('#trend_r_amount').html(amount_rate);
                $('#trend_r_regression').html(c_rate);
              }
            }

            desc_line();
            desc_details();
          }
          const desc_integral = () => {
            const desc_line = (mbt) => {
              let graph_data;
              let graph_option = {
                maintainAspectRatio:true,
                legend:{
                  labels:{
                    fontSize:10,
                  }
                },
                title: {display:false,fontSize:12,text:"",},
                elements: {
                  point:{radius:0}
                },
                responsive: true,
                scales: {
                  yAxes: [{
                    id: "y-axis-0",
                    type: "linear",
                    position: "left",
                    gridLines: {
                      display:true,
                      drawBorder: false,
                      zeroLineColor:"#eee",
                      color:"#eee"
                    },
                    ticks: {
                      min:0,
                      autoSkip: true,
                      fontSize:8,
                      maxTicksLimit:5,
                      callback: function(label, index, labels) {
                        return label.str_jp();
                      }
                    },
                  }],
                  xAxes: [{
                    barPercentage: .9,
                    categoryPercentage:1,
                    ticks: {
                      maxRotation: 0,
                      minRotation: 0,
                      fontSize:8,
                      autoSkip: true,
                      maxTicksLimit:5,
                    },
                    gridLines: {
                      display:false,
                      drawBorder: false,
                    },
                    scaleLabel: {
                      display: false,
                    }
                  }]
                },
                tooltips: {
                  bodySpacing:5,
                  titleFontSize:12.5,
                  bodyFontSize:15,
                  intersect:false,
                  axis:'x',
                  mode:'index',
                  callbacks: {
                    title:function(t,d) {
                      let index = t[0].index;
                      let period = pa[index];
                      period = period == undefined ? `0000-00-00` : period;
                      let week = new Date(period).getDay();
                      return `${period} (${wna[week]})`;
                    },
                    label:function(t,d) {
                      let index = t.index;
                      let idx = t.datasetIndex;
                      let amount = t.yLabel;
                      let ar = [["当期","平均","比較"],["当期","比較"]];
                      return `${ar[mbt][idx]} ${amount.toLocaleString()}`;
                    }
                  }
                }
              }
              if (mbt == 0) {
                graph_data = [{
                  type:"LineWithLine",
                  label:"成長線",
                  data:integral_regression_data,
                  backgroundColor:`rgba(66,113,244,.05)`,
                  borderColor:`rgba(66,113,244,1)`,
                  borderWidth:1.5,
                  fill:false,
                  yAxisID: "y-axis-0",
                  cubicInterpolationMode: 'monotone',
                  lineTension : 0
                },{
                  type:"LineWithLine",
                  label:"平均線",
                  data:integral_ave_arr,
                  backgroundColor:"#fff",
                  borderColor:`#bbb`,
                  borderWidth:1,
                  fill:false,
                  yAxisID: "y-axis-0",
                  cubicInterpolationMode: 'monotone',
                  lineTension : 0
                }];
                if (cpt) {
                  graph_data.push({
                    type:"LineWithLine",
                    label:"比較成長線",
                    data:integral_c_regression_data,
                    backgroundColor:`rgba(255,165,0,.05)`,
                    borderColor:`rgba(255,165,0,1)`,
                    borderWidth:1.5,
                    fill:false,
                    yAxisID: "y-axis-0",
                    cubicInterpolationMode: 'monotone',
                    lineTension : 0
                  });
                }
              } else {
                graph_data = [{
                  type:"LineWithLine",
                  data:integral_data_arr,
                  label:"累積値",
                  backgroundColor:`rgba(54,183,235,.05)`,
                  borderColor:"#36b7eb",
                  borderWidth: "2",
                  yAxisID: "y-axis-0",
                  pointBackgroundColor:"#fff",
                  fill:true,
                  cubicInterpolationMode: 'monotone',
                  lineTension : 0,
                  pointRadius:pointRadius_arr
                }];
                if (cpt) {
                  graph_data.push({
                    type:"LineWithLine",
                    label:"比較",
                    data:integral_c_data_arr,
                    backgroundColor:"#fff",
                    borderColor:"rgba(242,100,100,1)",
                    borderWidth:1,
                    fill:false,
                    yAxisID: "y-axis-0",
                    cubicInterpolationMode: 'monotone',
                    lineTension: 0,
                    pointRadius:pointRadius_arr
                  });
                }
              }
              integral_line.data = {
                labels:tpl,
                datasets:graph_data
              };
              integral_line.options = graph_option;
              integral_line.update();
            }
            const desc_details = () => {
              let par = ["日","週","月"];
              let lean = a.margin_str(``);
              let c_lean = c_a.margin_str(``);

              if (!cpt) {
                $('#trend_accel').html(`<div class="amount">${lean}<span class="indi">/${par[pt]}</span></div>`);
              } else {
                let rate = total.to_rate(c_total).rate_str();
                let r_rate = (a - c_a).margin_str(``);

                $('#trend_accel').html(
                  `
                  <div class="amount">${lean}<span class="indi">/${par[pt]}</span></div>
                  <div class="c_amount">${c_lean}<span class="indi">/${par[pt]}</span></div>
                  `
                );
                $('#trend_r_accel').html(r_rate);
              }
            }

            $(document).off('click','input[name="integral_input_"]').on('click','input[name="integral_input_"]',function() {
              let index = $('input[name="integral_input_"]').index(this);
              desc_line(index);
            });
            $('#integral_input_0').prop('checked',true);
            desc_line(0);
            desc_details();
          }

          desc_leveling();
          desc_trend();
          desc_integral();
        }
        const desc_volume = () => {
          let vrna = ["最小値","中央値","平均","最大値"];
          let vria = [
            `<i class="fas fa-arrow-to-bottom"></i>`,
            `<i class="fad fa-ellipsis-h"></i>`,
            `<i class="fad fa-ellipsis-v"></i>`,
            `<i class="fas fa-arrow-to-top"></i>`
          ];

          let total = datas.sum_val(`data_${ct}`);
          let ave = total.to_Perate(data_length);
          let median = datas.median_val(`data_${ct}`);
          let min = datas.min_val(`data_${ct}`);
          let max = datas.max_val(`data_${ct}`);

          let da = [min,median,ave,max];


          let c_total = c_datas.sum_val(`data_${ct}`);
          let c_ave = c_total.to_devide(c_data_length);
          let c_median = c_datas.median_val(`data_${ct}`);
          let c_min = c_datas.min_val(`data_${ct}`);
          let c_max = c_datas.max_val(`data_${ct}`);

          let cda = [c_min,c_median,c_ave,c_max];

          let ap = ``;
          for (let i = 0;i < 4;i++) {
            if (!cpt) {
              ap +=
              `
              <div class="row">
                <div class="row_title">
                  <span class="icon inline">${vria[i]}</span> ${vrna[i]}
                </div>
                <div class="content">
                  <div class="amount">${da[i].toLocaleString()}</div>
                </div>
              </div>
              `;
            } else {
              let rate = da[i].to_rate(cda[i]).rate_str();
              ap +=
              `
              <div class="row">
                <div class="row_title">
                  <span class="icon inline">${vria[i]}</span> ${vrna[i]}
                  <div class="rate_amount">${rate}</div>
                </div>
                <div class="content">
                  <div class="amount">${da[i].toLocaleString()}</div>
                  <div class="c_amount">${cda[i].toLocaleString()}</div>
                </div>
              </div>
              `;
            }
          }
          $('#cb_quantity').html(ap);
        }
        const desc_effect = () => {
          let vrna = ["1メニューあたり","1時間あたり"];
          let vria = [
            `<i class="fas fa-file-alt"></i>`,
            `<i class="fas fa-clock"></i>`
          ];

          let total = datas.sum_val(`data_${ct}`);
          let menu = datas.sum_val(`data_1`);
          let hour = datas.sum_val(`data_5`);

          let mup = total.to_Perate(menu);
          let hup = total.to_Perate(hour);

          let da = [mup,hup];

          let c_total = c_datas.sum_val(`data_${ct}`);
          let c_menu = c_datas.sum_val(`data_1`);
          let c_hour = c_datas.sum_val(`data_5`);

          let c_mup = c_total.to_devide(c_menu);
          let c_hup = c_total.to_devide(c_hour);

          let cda = [c_mup,c_hup];

          let ap = ``;
          for (let i = 0;i < 2;i++) {
            if (!cpt) {
              ap +=
              `
              <div class="row">
                <div class="row_title">
                  <span class="icon inline">${vria[i]}</span> ${vrna[i]}
                </div>
                <div class="content">
                  <div class="amount">${da[i].toLocaleString()}</div>
                </div>
              </div>
              `;
            } else {
              let rate = da[i].to_rate(cda[i]).rate_str();
              ap +=
              `
              <div class="row">
                <div class="row_title">
                  <span class="icon inline">${vria[i]}</span> ${vrna[i]}
                  <div class="rate_amount">${rate}</div>
                </div>
                <div class="content">
                  <div class="amount">${da[i].toLocaleString()}</div>
                  <div class="c_amount">${cda[i].toLocaleString()}</div>
                </div>
              </div>
              `;
            }
          }
          $('#cb_quality').html(ap);
        }

        desc_trend_section();
        desc_volume();
        desc_effect();
      }
      const desc_static_sections = () => {
        const desc_week_section = () => {
          let week_pa = period_map(ps,pe,1);
          let day_pa = period_map(ps,pe,0);
          let first_day_week = new Date(ps).getDay();
          let last_day_week = new Date(pe).getDay();

          let colorar = [
            "rgb(242,100,100)",
            "rgba(54,183,235,1)",
            "rgba(54,183,235,1)",
            "rgba(54,183,235,.66)",
            "rgba(54,183,235,.66)",
            "rgba(54,183,235,.33)",
            "rgb(18,83,164)"
          ];
          let dashar = ["","","borderDash: [5,2],","","borderDash: [5,2],","",""];

          let tpl = week_pa.map((label,idx) => {return `${idx + 1 - week_pa.length}週`;});

          let w_data0 = [],w_data1 = [],w_data2 = [],w_data3 = [],w_data4 = [],w_data5 = [],w_data6 = [],data_arr = [];

          for (let i = 0;i < 7;i++) {
            if (i < first_day_week) {
              eval(`w_data${i}.push(null)`);
            }
          }
          day_pa.forEach((label) => {
            let result = data.data.week.filter(({period}) => period == label);
            let amount = result.sum_val(`data_0`);
            let week = new Date(label).getDay();
            eval(`w_data${week}.push(${amount})`);
          });

          const desc_leveling = () => {
            for (let i = 0;i < 7;i++) {
              let t_w_ = i == new Date().getDay() ? false : true;
              eval(
                `
                data_arr.push({
                  label:"${wna[i]}",
                  type:"line",
                  data:w_data${i},
                  backgroundColor:"rgba(0,0,0,0)",
                  pointBackgroundColor:"#fff",
                  ${dashar[i]}
                  borderColor:"${colorar[i]}",
                  borderWidth: "1.5",
                  fill: true,
                  hidden:t_w_,
                  lineTension : 0
                });
                `
              );
            }
          }
          const desc_line = () => {
            let graph_data = data_arr;
            let graph_option = {
              maintainAspectRatio: false,
              title: {display:false,fontSize:12,text:"",},
              legend:{
                labels:{
                  fontSize:10,
                  boxWidth:20
                }
              },
              elements: {point:{radius:0}},
              responsive: true,
              scales: {
                yAxes: [{
                  id: "y-axis-0",
                  type: "linear",
                  position: "left",
                  gridLines: {
                    display:true,
                    drawBorder: false,
                    zeroLineColor:"#eee",
                    color:"#eee"
                  },
                  ticks: {
                    autoSkip: true,
                    fontSize:8,
                    maxTicksLimit: 3,
                    min:0,
                    callback: function(label, index, labels) {
                      return label.str_jp();
                    }
                  },
                }],
                xAxes: [{
                  barPercentage:.9,
                  categoryPercentage:1,
                  ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    fontSize:8,
                    autoSkip: true,
                    maxTicksLimit:8,
                  },
                  gridLines: {
                    display:false,
                    drawBorder: false,
                  },
                  scaleLabel: {
                    display: false,
                  }
                }]
              },
              tooltips: {
                bodySpacing:5,
                titleFontSize:12.5,
                bodyFontSize:15,
                axis:'x',
                mode:'index',
                // intersect:false,
                callbacks: {
                  label:function(t,d) {
                    let index = t.datasetIndex;
                    let name = `${wna[index]}曜日`;
                    let amount = t.yLabel;
                    return `${name} : ¥${amount.toLocaleString()}`;
                  }
                }
              }
            }
            week_line.data = {
              labels:tpl,
              datasets:graph_data
            };
            week_line.options = graph_option;
            week_line.update();

          }
          const desc_details = () => {
            let total = data.data.week.sum_val(`data_0`);

            let data0 = w_data0.sum_val(``);
            let data1 = w_data1.sum_val(``);
            let data2 = w_data2.sum_val(``);
            let data3 = w_data3.sum_val(``);
            let data4 = w_data4.sum_val(``);
            let data5 = w_data5.sum_val(``);
            let data6 = w_data6.sum_val(``);

            let rate0 = data0.to_perate(total);
            let rate1 = data1.to_perate(total);
            let rate2 = data2.to_perate(total);
            let rate3 = data3.to_perate(total);
            let rate4 = data4.to_perate(total);
            let rate5 = data5.to_perate(total);
            let rate6 = data6.to_perate(total);

            $('#week_a_t0').html(data0.str_jp());
            $('#week_a_t1').html(data1.str_jp());
            $('#week_a_t2').html(data2.str_jp());
            $('#week_a_t3').html(data3.str_jp());
            $('#week_a_t4').html(data4.str_jp());
            $('#week_a_t5').html(data5.str_jp());
            $('#week_a_t6').html(data6.str_jp());

            $('#week_r_t0').html(`${rate0}%`);
            $('#week_r_t1').html(`${rate1}%`);
            $('#week_r_t2').html(`${rate2}%`);
            $('#week_r_t3').html(`${rate3}%`);
            $('#week_r_t4').html(`${rate4}%`);
            $('#week_r_t5').html(`${rate5}%`);
            $('#week_r_t6').html(`${rate6}%`);

            $('#week_b_t0').css('width',`${rate0}%`);
            $('#week_b_t1').css('width',`${rate1}%`);
            $('#week_b_t2').css('width',`${rate2}%`);
            $('#week_b_t3').css('width',`${rate3}%`);
            $('#week_b_t4').css('width',`${rate4}%`);
            $('#week_b_t5').css('width',`${rate5}%`);
            $('#week_b_t6').css('width',`${rate6}%`);
          }

          desc_leveling();
          desc_line();
          desc_details();
        }
        const desc_source_section = () => {
          let objs = [
            datas.sum_val(`data_1`),
            datas.sum_val(`data_4`),
            datas.sum_val(`data_1`) - datas.sum_val(`data_4`) - datas.sum_val(`data_3`),
            datas.sum_val(`data_3`)
          ];
          let c_objs = [
            c_datas.sum_val(`data_1`),
            c_datas.sum_val(`data_4`),
            c_datas.sum_val(`data_1`) - c_datas.sum_val(`data_4`) - c_datas.sum_val(`data_3`),
            c_datas.sum_val(`data_3`)
          ];

          const desc_source = () => {
            let data0 = objs[0];
            let data1 = objs[1];
            let data2 = objs[2];
            let data3 = objs[3];

            let perate_data1 = data1.to_perate(data0);
            let perate_data2 = data2.to_perate(data0);
            let perate_data3 = data3.to_perate(data0);

            if (!cpt) {
              $('#source_bb').html(
                `
                <div class="bar_base inline">
                  <div class="bb" style="height:100%;">
                    <div class="bar bar_0" style="height:${perate_data1}%;"></div>
                    <div class="bar bar_1" style="height:${perate_data2}%;"></div>
                    <div class="bar bar_2" style="height:${perate_data3}%;"></div>
                  </div>
                </div>
                `
              );
              $('#source_data0').html(`
                <div class="amount text_overflow">${data1.str_jp()}</div>
                <div class="rate text_overflow">${perate_data1}%</div>
              `);
              $('#source_data1').html(`
                <div class="amount text_overflow">${data2.str_jp()}</div>
                <div class="rate text_overflow">${perate_data2}%</div>
              `);
              $('#source_data2').html(`
                <div class="amount text_overflow">${data3.str_jp()}</div>
                <div class="rate text_overflow">${perate_data3}%</div>
              `);
            } else {
              let c_data0 = c_objs[0];
              let c_data1 = c_objs[1];
              let c_data2 = c_objs[2];
              let c_data3 = c_objs[3];

              let max = Math.max.apply(null,[data0,c_data0].map(function(o){return o;}));

              let rate_total = data0.to_perate(max);
              let rate_c_total = c_data0.to_perate(max);

              let perate_c_data1 = c_data1.to_perate(c_data0);
              let perate_c_data2 = c_data2.to_perate(c_data0);
              let perate_c_data3 = c_data3.to_perate(c_data0);

              let rate_data1 = data1.to_rate(c_data1).rate_str();
              let margin_data1 = (data1 - c_data1).margin_str(``);
              let rate_data2 = data2.to_rate(c_data2).rate_str();
              let margin_data2 = (data2 - c_data2).margin_str(``);
              let rate_data3 = data3.to_rate(c_data3).rate_str();
              let margin_data3 = (data3 - c_data3).margin_str(``);

              $('#source_bb').html(`
                <div class="bar_base inline" data-title="比較">
                  <div class="bb" style="height:${rate_c_total}%;">
                    <div class="bar bar_0" style="height:${perate_c_data1}%;"></div>
                    <div class="bar bar_1" style="height:${perate_c_data2}%;"></div>
                    <div class="bar bar_2" style="height:${perate_c_data3}%;"></div>
                  </div>
                </div>
                <div class="bar_base inline" data-title="">
                  <div class="bb" style="height:${rate_total}%;">
                    <div class="bar bar_0" style="height:${perate_data1}%;"></div>
                    <div class="bar bar_1" style="height:${perate_data2}%;"></div>
                    <div class="bar bar_2" style="height:${perate_data3}%;"></div>
                  </div>
                </div>
              `);
              $('#source_data0').html(`
                <div class="amount text_overflow">${margin_data1}</div>
                <div class="rate text_overflow">${rate_data1}</div>
              `);
              $('#source_data1').html(`
                <div class="amount text_overflow">${margin_data2}</div>
                <div class="rate text_overflow">${rate_data2}</div>
              `);
              $('#source_data2').html(`
                <div class="amount text_overflow">${margin_data3}</div>
                <div class="rate text_overflow">${rate_data3}</div>
              `);
            }

          }
          desc_source();
        }
        const desc_customer_section = () => {
          let cna = ["gender","generation"];
          let objs = data.data.geneder;
          let c_objs = data.cdata.geneder;

          let total = datas.sum_val(`data_1`);
          let c_total = c_datas.sum_val(`data_1`);
          const desc_gender = () => {
            let male = objs.filter(({gender}) => gender == 1).sum_val(`count`);
            let female = objs.filter(({gender}) => gender == 2).sum_val(`count`);

            let perate_male = male.to_perate(total);
            let perate_female = female.to_perate(total);

            if (!cpt) {
              $('#customer_gender').html(`
                <div class="bar_base inline">
                  <div class="bb" style="height:100%;">
                    <div class="bar bar_0" style="height:${perate_male}%;"></div>
                    <div class="bar bar_1" style="height:${perate_female}%;"></div>
                  </div>
                </div>
              `);
              $('#customer_male').html(`
                <div class="amount text_overflow">${male.str_jp()}</div>
                <div class="rate text_overflow">${perate_male}%</div>
              `);
              $('#customer_female').html(`
                <div class="amount text_overflow">${female.str_jp()}</div>
                <div class="rate text_overflow">${perate_female}%</div>
              `);
            } else {
              let max = Math.max.apply(null,[total,c_total].map(function(o){return o;}));

              let rate_total = total.to_perate(max);
              let rate_c_total = c_total.to_perate(max);

              let c_male = c_objs.filter(({gender}) => gender == 1).sum_val(`count`);
              let c_female = c_objs.filter(({gender}) => gender == 2).sum_val(`count`);

              let perate_c_male = c_male.to_perate(c_total);
              let perate_c_female = c_female.to_perate(c_total);

              let rate_male = male.to_rate(c_male).rate_str();
              let margin_male = (male - c_male).margin_str(``);

              let rate_female = female.to_rate(c_female).rate_str();
              let margin_female = (female - c_female).margin_str(``);

              $('#customer_gender').html(`
                <div class="bar_base inline" data-title="比較">
                  <div class="bb" style="height:${rate_c_total}%;">
                    <div class="bar bar_0" style="height:${perate_c_male}%;"></div>
                    <div class="bar bar_1" style="height:${perate_c_female}%;"></div>
                  </div>
                </div>
                <div class="bar_base inline" data-title="">
                  <div class="bb" style="height:${rate_total}%;">
                    <div class="bar bar_0" style="height:${perate_male}%;"></div>
                    <div class="bar bar_1" style="height:${perate_female}%;"></div>
                  </div>
                </div>
              `);
              $('#customer_male').html(`
                <div class="amount text_overflow">${margin_male}</div>
                <div class="rate text_overflow">${rate_male}</div>
              `);
              $('#customer_female').html(`
                <div class="amount text_overflow">${margin_female}</div>
                <div class="rate text_overflow">${rate_female}</div>
              `);
            }
          }
          const desc_generation = () => {
            let age1 = objs.filter(({generation}) => generation == 1).sum_val(`count`);
            let age2 = objs.filter(({generation}) => generation == 2).sum_val(`count`);
            let age3 = objs.filter(({generation}) => generation == 3).sum_val(`count`);

            let perate_age1 = age1.to_perate(total);
            let perate_age2 = age2.to_perate(total);
            let perate_age3 = age3.to_perate(total);

            if (!cpt) {
              $('#customer_generation').html(`
                <div class="bar_base inline">
                  <div class="bb" style="height:100%;">
                    <div class="bar bar_0" style="height:${perate_age1}%;"></div>
                    <div class="bar bar_1" style="height:${perate_age2}%;"></div>
                    <div class="bar bar_2" style="height:${perate_age3}%;"></div>
                  </div>
                </div>
              `);
              $('#customer_age1').html(`
                <div class="amount text_overflow">${age1.str_jp()}</div>
                <div class="rate text_overflow">${perate_age1}%</div>
              `);
              $('#customer_age2').html(`
                <div class="amount text_overflow">${age2.str_jp()}</div>
                <div class="rate text_overflow">${perate_age2}%</div>
              `);
              $('#customer_age3').html(`
                <div class="amount text_overflow">${age3.str_jp()}</div>
                <div class="rate text_overflow">${perate_age3}%</div>
              `);
            } else {
              let max = Math.max.apply(null,[total,c_total].map(function(o){return o;}));

              let rate_total = total.to_perate(max);
              let rate_c_total = c_total.to_perate(max);

              let c_age1 = c_objs.filter(({generation}) => generation == 1).sum_val(`count`);
              let c_age2 = c_objs.filter(({generation}) => generation == 2).sum_val(`count`);
              let c_age3 = c_objs.filter(({generation}) => generation == 3).sum_val(`count`);

              let perate_c_age1 = c_age1.to_perate(c_total);
              let perate_c_age2 = c_age2.to_perate(c_total);
              let perate_c_age3 = c_age3.to_perate(c_total);

              let rate_age1 = age1.to_rate(c_age1).rate_str();
              let margin_age1 = (age1 - c_age1).margin_str(``);
              let rate_age2 = age2.to_rate(c_age2).rate_str();
              let margin_age2 = (age2 - c_age2).margin_str(``);
              let rate_age3 = age3.to_rate(c_age3).rate_str();
              let margin_age3 = (age3 - c_age3).margin_str(``);

              $('#customer_generation').html(`
                <div class="bar_base inline" data-title="比較">
                  <div class="bb" style="height:${rate_c_total}%;">
                    <div class="bar bar_0" style="height:${perate_c_age1}%;"></div>
                    <div class="bar bar_1" style="height:${perate_c_age2}%;"></div>
                    <div class="bar bar_2" style="height:${perate_c_age3}%;"></div>
                  </div>
                </div>
                <div class="bar_base inline">
                  <div class="bb" style="height:${rate_total}%;">
                    <div class="bar bar_0" style="height:${perate_age1}%;"></div>
                    <div class="bar bar_1" style="height:${perate_age2}%;"></div>
                    <div class="bar bar_2" style="height:${perate_age3}%;"></div>
                  </div>
                </div>
              `);
              $('#customer_age1').html(`
                <div class="amount text_overflow">${margin_age1}</div>
                <div class="rate text_overflow">${rate_age1}</div>
              `);
              $('#customer_age2').html(`
                <div class="amount text_overflow">${margin_age2}</div>
                <div class="rate text_overflow">${rate_age2}</div>
              `);
              $('#customer_age3').html(`
                <div class="amount text_overflow">${margin_age3}</div>
                <div class="rate text_overflow">${rate_age3}</div>
              `);
            }
          }
          desc_gender();
          desc_generation();
        }
        const desc_hour_section = () => {
          (() => {
            let indi_ap = ``;
            for (let i = 6;i <= 23;i++) {
              indi_ap += `<div class="cel">${i}:00</div>`;
            }
            let max = data.data.hour.max_val(`data_0`);
            let content_ap = ``;
            for (let i = 6;i <= 23;i++) {
              for (let idx = 0;idx < 7;idx++) {
                let result = data.data.hour.filter((cell) => cell.time == i && cell.week == idx);
                let amount = result.sum_val(`data_0`);
                let rate = amount.to_perate(max);
                content_ap += `<div class="cel" style="opacity:${20 + rate.to_perate(100)}%;"></div>`;
              }
            }
            if (!cpt) {
              $('#hour_graph_base').html(
                `
                <div class="week_base">
                  <div class="cels_base">${content_ap}</div>
                  <div class="indi_base">${indi_ap}</div>
                </div>
                `
              );
            } else {
              let c_max = data.cdata.hour.max_val(`data_0`);
              let c_content_ap = ``;
              for (let i = 6;i <= 23;i++) {
                for (let idx = 0;idx < 7;idx++) {
                  let result = data.cdata.hour.filter((cell) => cell.time == i && cell.week == idx);
                  let amount = result.sum_val(`data_0`);
                  let rate = amount.to_perate(c_max);
                  c_content_ap += `<div class="cel" style="opacity:${20 + rate.to_perate(100)}%;"></div>`;
                }
              }

              $('#hour_graph_base').html(
                `
                <div class="week_base week_con_base">
                  <div class="cels_base">${content_ap}</div>
                  <div class="indi_base">${indi_ap}</div>
                  <div class="cels_base cells_con_base">${c_content_ap}</div>
                </div>
                `
              );
            }
          })();
          (() => {
            let ap = ``;
            for (let i = 0;i < 7;i++) {
              ap +=`<div class="cel">${wna[i]}</div>`;
            }

            if (!cpt) {
              $('#hour_week_indi').html(
                `
                <div class="week_base">
                  <div class="indi_base">${ap}</div>
                  <div class="empty"></div>
                </div>
                `
              );
            } else {
              $('#hour_week_indi').html(
                `
                <div class="week_base week_con_base">
                  <div class="indi_base">${ap}</div>
                  <div class="empty"></div>
                  <div class="indi_base">${ap}</div>
                </div>
                `
              );
            }
          })();
          (() => {
            let max = data.data.hour.max_val(`data_0`);
            let min = data.data.hour.min_val(`data_0`);
            if (!cpt) {
              $('#hour_gradient_indi').html(
                `
                <div class="week_base">
                  <div class="indi_base">
                    <div class="number inline">${min}人</div>
                    <div class="bar inline"></div>
                    <div class="number inline">${max}人</div>
                  </div>
                  <div class="empty"></div>
                </div>
                `
              );
            } else {
              let c_max = data.cdata.hour.max_val(`data_0`);
              let c_min = data.cdata.hour.min_val(`data_0`);

              $('#hour_gradient_indi').html(
                `
                <div class="week_base week_con_base">
                  <div class="indi_base">
                    <div class="number inline">${min}人</div>
                    <div class="bar inline"></div>
                    <div class="number inline">${max}人</div>
                  </div>
                  <div class="empty"></div>
                  <div class="indi_base">
                    <div class="number inline">${c_min}人</div>
                    <div class="bar con_bar inline"></div>
                    <div class="number inline">${c_max}人</div>
                  </div>
                </div>
                `
              );
            }
          })();
        }
        const desc_associate = () => {
          let objs = data.data.associate;
          let menu_objs = sender_menus_objs[Number(mt)];
          let ap = ``;

          (() => {
            (() => {
              let obj = data.data.all;
              let count = obj[0].data_0;
              let cup = obj[0].data_3.to_devide(count);

              ap +=
              `
              <tr>
                <th>全体</th>
                <td>${count.toLocaleString()}</td>
                <td>¥${cup.toLocaleString()}</td>
              </tr>
              `;
            })();
            (() => {
              let name = menu_objs.filter(({id}) => id == mid)[0].name;
              let obj = data.data.unit;
              let count = obj[0].data_0 || 0;
              let amount = obj[0].data_2 || 0;
              let cup = amount.to_devide(count);

              ap +=
              `
              <tr>
                <th>${name}</th>
                <td>${count.toLocaleString()}</td>
                <td>¥${cup.toLocaleString()}</td>
              </tr>
              `;
            })();
          })();

          objs.forEach((cell) => {
            let name = menu_objs.filter(({id}) => id == cell.obj_id)[0].name;
            let count = cell.data_0 || 0;
            let cup = cell.data_1.to_devide(1) || 0;

            ap +=
            `
            <tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=${mt}&ms=true&mi=${cell.obj_id}">
                  ${name}
                </a>
              </th>
              <td>${count.toLocaleString()}</td>
              <td>¥${cup.toLocaleString()}</td>
            </tr>
            `;
          });

          $('#associate_table_base').html(
            `
            <table id="associate_base">
              <thead>
                <tr>
                  <th></th>
                  <th>施術人数</th>
                  <th>客単価</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );

          let table = $('#associate_base').DataTable({
            columnDefs:[{type:'currency',targets:[1,2]}],
            lengthMenu: [10,20,30,40,50],
            displayLength:10,
            lengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            paging: true,
            order:[]
          });
        }
        const desc_association = () => {
          let objs = data.data.association;
          let menu_objs = sender_menus_objs[Number(mt)];
          let ma = data.data.unit[0].data_0;
          let all = data.data.all[0].data_2;

          let ap = ``;

          objs.forEach((cell) => {
            let name = menu_objs.filter(({id}) => id == cell.obj_id)[0].name;

            let data_0 = cell.data_0;
            let data_1 = cell.data_1;
            let data_2 = cell.data_2;

            let amount = data_0;
            let xy_count = data_1;
            let y_count = data_2;
            let confidence = xy_count.to_perate(ma);
            let support = xy_count.to_perate(all);
            let majority = y_count.to_perate(all);
            let lift = confidence.to_Perate(majority);

            ap +=
            `
            <tr>
              <th>
                <a href="/achieve_analytics?st=${st}&ss=true&si=${sid}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}&bt=3&mt=${mt}&ms=true&mi=${cell.obj_id}">
                  ${name}
                </a>
              </th>
              <td>¥${amount.toLocaleString()}</td>
              <td>${xy_count.toLocaleString()}</td>
              <td>${y_count.toLocaleString()}</td>
              <td>
                ${confidence}%
                <div class="bb" style="width:${confidence}%;"></div>
              </td>
              <td>${support}%</td>
              <td>
                ${majority}%
                <div class="bb" style="width:${majority}%;"></div>
              </td>
              <td>${lift}</td>
            </tr>
            `;
          });

          $('#association_table_base').html(
            `
            <table id="association_table">
              <thead>
                <tr>
                  <th></th>
                  <th>追加売上</th>
                  <th>共起頻度</th>
                  <th>独立頻度</th>
                  <th>信頼度</th>
                  <th>支持度</th>
                  <th>人気度</th>
                  <th>リフト値</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
          let table = $('#association_table').DataTable({
            columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7]}],
            lengthMenu: [10,20,30,40,50],
            displayLength:10,
            lengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            paging: true,
            order:[[7,"desc"]]
          });
        }

        desc_week_section();
        desc_source_section();
        desc_customer_section();
        desc_hour_section();
        desc_associate();
        desc_association();
      }

      desc_unit();
      desc_cells_btn();
      desc_dynamic_sections(0);
      desc_static_sections();

      $(document).off('input','input[name="cell_input_"]').on('input','input[name="cell_input_"]',function() {
        let index = $('input[name="cell_input_"]').index(this);
        desc_dynamic_sections(Number(index));
      });
    }

    desc_content_leveling();
    const desc_graph_init = (sender1,sender2,sender3,sender4) => {
      eval(`try {${sender1}.destroy();} catch(err) {}`);
      eval(`${sender2}.canvas.height = 100;`);
      eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
    }

    let trend_line;
    let integral_line;
    let week_line;

    let trend_line_ctx = document.getElementById('trend_line').getContext('2d');
    desc_graph_init("trend_line","trend_line_ctx",'bar');
    let integral_line_ctx = document.getElementById('integral_line').getContext('2d');
    desc_graph_init("integral_line","integral_line_ctx",'bar');
    let week_line_ctx = document.getElementById('week_line').getContext('2d');
    desc_graph_init("week_line","week_line_ctx",'bar');

    const ajax = async () => {
      let result = await desc_menu_query_data(bt);
      if (result.dataExists) {
        desc_menu_content(result.data);
      } else {
        alert(`データ通信エラー:${result.reason}`);
      }
    }
    $(document).off('click','#menu_query_btn').on('click','#menu_query_btn',function() {
      ajax();
    });
    ajax();
  } else if (bt == 4) {
    const desc_content_leveling = () => {
      let ap =
      `
      <div class="section">
        <div class="section_title">メニュー選択</div>
        <div class="setting_box inline">
          <input class="input_label" type="checkbox" id="setting_m">
          <label class="label_indi" for="setting_m" id="setting_menu_indi">
            <div class="cell inline"><i class="fad fa-folders"></i></div>
            <div class="cell inline">施術タイプ</div>
            <div class="cell inline">施術名</div>
            <div class="cell cell_indi inline"><i class="fas fa-caret-down"></i></div>
          </label>
          <div class="modal">
            <div class="modal_title">
              <i class="fas fa-cogs"></i> メニュー設定
              <label for="setting_m"><i class="fas fa-times"></i></label>
            </div>
            <div class="box">
              <div class="content">
                <div class="osbb select_box" id="menusb">
                  <select id="menu_type_select">
                    <option value="0">大分類</option>
                    <option value="1">中分類</option>
                    <option value="2">小分類</option>
                    <option value="3">キーワード</option>
                    <option value="4">メニュー</option>
                  </select>
                  <div class="icon_base"><i class="fas fa-caret-down"></i></div>
                </div>
              </div>
            </div>
            <div class="box">
              <div class="content">
                <div class="osbb select_box">
                  <select id="menu_select" class="menu_select">
                    ${sender_menus_so[0]}
                  </select>
                  <div class="icon_base"><i class="fas fa-caret-down"></i></div>
                </div>
              </div>
            </div>
            <div class="box">
              <div class="indi">比較</div>
              <div class="content">
                ${cpt
                  ?　`<div class="osbb c_osbb select_box">
                    <select id="c_menu_select" class="menu_select">
                      ${sender_menus_so[0]}
                    </select>
                    <div class="icon_base"><i class="fas fa-caret-down"></i></div>
                  </div>`
                  : `比較しない`
                }
              </div>
            </div>
            <div class="box_submit">
              <div class="indi"></div>
              <div class="content">
                <div class="submit_base">
                  <button type="submit" id="menu_query_btn">適用する <i class="fas fa-caret-down"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      if (st == 0) {
        ap +=
        `
        <div class="section">
          <div class="section_title">店舗別</div>
          <div class="cells_box">
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">リスト</div>
                <div class="content _segment_">
                  <div class="table_base table_base2" id="clinic_table_base">
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客属性</div>
                <div class="content _segment_">
                  <div class="table_base table_base2 no_border" id="clinic_customer_table_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_nx1__15rem inline">
              <div class="box">
                <div class="cell_title text_overflow">自費売上パイチャート</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="clinic_pie" width="100" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_13x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">箱ひげ図</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="clinic_boxplot" width="300" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      }
      if (st <= 1) {
        ap +=
        `
        <div class="section">
          <div class="section_title">担当者別</div>
          <div class="cells_box">
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">リスト</div>
                <div class="content _segment_">
                  <div class="table_base table_base2" id="staff_table_base">
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">顧客属性</div>
                <div class="content _segment_">
                  <div class="table_base table_base2 no_border" id="staff_customer_table_base"></div>
                </div>
              </div>
            </div>
            <div class="cell cell_nx1__15rem inline">
              <div class="box">
                <div class="cell_title text_overflow">自費売上パイチャート</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="staff_pie" width="100" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_13x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">箱ひげ図</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="staff_boxplot" width="300" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      }
      ap +=
      `
      <div class="section">
        <div class="section_title">顧客属性別</div>
        <div class="cells_box">
          <div class="cell cell_4x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">リスト</div>
              <div class="content _segment_">
                <div class="table_base table_base2" id="customer_table_base">
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_nx1__15rem inline">
            <div class="box">
              <div class="cell_title text_overflow">自費売上パイチャート</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="customer_pie" width="100" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_13x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">箱ひげ図</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="customer_boxplot" width="300" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      $('#content_base').html(ap);

      let m_type = getDOM(`m_type`).value;
      $(`#menu_type_select option[value="${m_type}"]`).prop('selected',true);
      desc_menu_option(m_type);
      if (m_select) {
        let m_id = getDOM(`m_id`).value;
        $(`#menu_select option[value="${m_id}"]`).prop('selected',true);
      }
    }
    const desc_menu_content = (data) => {
      const desc_static_sections = () => {
        const desc_clinics = () => {
          let obj = data.data.cl;
          let c_obj = data.cdata.cl;
          if (!obj.exist_val()) return;

          let sum_data_0 = obj.sum_val(`data_0`);
          let sum_data_1 = obj.sum_val(`data_1`);
          let sum_data_2 = obj.sum_val(`data_2`);
          let sum_data_3 = obj.sum_val(`data_3`);

          const desc_pie = () => {
            let data_arr = [];
            for (let i = 0;i < 5;i++) {
              if (i >= obj.length) continue;
              let cell = obj[i];
              data_arr.push(cell.data_0);
            }
            if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

            let graph_plugin = {
              afterDatasetsDraw: function (chart, easing) {
                var ctx = chart.ctx;
                chart.data.datasets.forEach(function (dataset, i) {
                  var meta = chart.getDatasetMeta(i);
                  if (!meta.hidden) {
                    meta.data.forEach(function (element, index) {
                      ctx.fillStyle = "white";
                      var fontSize = 8;
                      var fontStyle = 'normal';
                      var fontFamily = 'Helvetica Neue';
                      ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                      let amount = data_arr[index].to_perate(sum_data_0);
                      var dataString =
                      amount > 0 ? [`${amount}%`] : [``];
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
                      var padding = 5;
                      var position = element.tooltipPosition();
                      ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                    });
                  }
                });
              }
            }
            let graph_data = [{
              data:data_arr,
              backgroundColor:pgca,
              borderColor:"",
              borderWidth:0,
            }];
            let graph_option = {
              maintainAspectRatio: true,
              responsive: true,
              cutoutPercentage:0,
              title: {display:false,fontSize:12,fontStyle:500,text: ''},
              pieceLabel: {render: 'label',position: 'outside'},
              tooltips:{
                callbacks: {
                  title:function(t,d) {
                    let index = t[0].index;
                    let name = index != 5 ? obj[index].obj_name : `その他`;
                    return `${name}`;
                  },
                  label: function(t,d) {
                    let index = t.index;
                    let amount = data_arr[index];
                    return `¥${amount.toLocaleString()}`;
                  }
                }
              }
            }
            clinic_pie.data = {
              labels:"",
              datasets:graph_data,
            };
            clinic_pie.config.plugins = [graph_plugin];
            clinic_pie.options = graph_option;
            clinic_pie.update();
          }
          const desc_plot = () => {
            let data_0_arr = [];
            let data_1_arr = [];
            let data_2_arr = [];
            let data_c_0_arr = [];
            let data_c_1_arr = [];
            let data_c_2_arr = [];

            obj.forEach((cell) => {
              data_0_arr.push(cell.data_1);
              data_1_arr.push(cell.data_2);
              data_2_arr.push(cell.data_3);
            });
            if (cpt) {
              c_obj.forEach((cell) => {
                data_c_0_arr.push(cell.data_1);
                data_c_1_arr.push(cell.data_2);
                data_c_2_arr.push(cell.data_3);
              });
            }
            let graph_data = [];

            graph_data = [{
              label:"当期",
              backgroundColor:'rgba(54,100,180,.5)',
              borderColor:'rgba(54,100,180,1)',
              borderWidth: 1.5,
              outlierColor: '#999999',
              padding: 10,
              itemRadius: 0,
              data: [data_0_arr,data_1_arr,data_2_arr],
            }];
            if (cpt) {
              graph_data.push({
                label:"前期",
                backgroundColor:'rgba(242,100,100,.5)',
                borderColor:'rgb(242,100,100)',
                borderWidth: 1.5,
                outlierColor: '#999999',
                padding: 10,
                itemRadius: 0,
                data: [data_c_0_arr,data_c_1_arr,data_c_2_arr],
              });
            }
            let graph_option = {
              maintainAspectRatio:true,
              responsive: true,
              legend:{labels:{fontSize:10,boxWidth:24}},
              title: {display:false},
              scales: {
                yAxes: [{
                  gridLines: {
                    display:true,
                    drawBorder: false,
                    zeroLineColor:"#eee",
                    color:"#eee"
                  },
                  ticks: {
                    autoSkip: true,
                    fontSize:8,
                    maxTicksLimit:6,
                    callback: function(label, index, labels) {
                      return label.str_jp();
                    }
                  },
                }],
                xAxes: [{
                  ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    fontSize:8,
                    autoSkip: true,
                  },
                  gridLines: {
                    display:false,
                    drawBorder: false,
                  },
                  scaleLabel: {
                    display: false,
                  }
                }]
              },
              tooltips:{
                bodySpacing:5,
                titleFontSize:12.5,
                bodyFontSize:15,
                intersect:false,
                axis:'x',
                mode:'index',
              }
            }
            clinic_boxplot.data = {
              labels:["施術回数","純患数","新患数"],
              datasets:graph_data,
            };
            clinic_boxplot.options = graph_option;
            clinic_boxplot.update();
          }
          const desc_table = () => {
            let ap = ``;
            obj.forEach((cell) => {
              let data_0 = cell.data_0;
              let data_1 = cell.data_1;
              let data_2 = cell.data_2;
              let data_3 = cell.data_3;

              let app = ``;

              if (!cpt) {
                let rate_0 = data_0.to_perate(sum_data_0);
                let rate_1 = data_1.to_perate(sum_data_1);
                let rate_2 = data_2.to_perate(sum_data_2);
                let rate_3 = data_3.to_perate(sum_data_3);

                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span class="percent">${eval(`rate_${i}`)}%</span>
                    </div>
                    <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                  </td>
                  `;
                }
              } else {
                let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
                if (c_cell.exist_val()) {
                  let c_data_0 = c_cell.sum_val(`data_0`);
                  let c_data_1 = c_cell.sum_val(`data_1`);
                  let c_data_2 = c_cell.sum_val(`data_2`);
                  let c_data_3 = c_cell.sum_val(`data_3`);

                  let rate_0 = data_0.to_rate(c_data_0).rate_str();
                  let rate_1 = data_1.to_rate(c_data_1).rate_str();
                  let rate_2 = data_2.to_rate(c_data_2).rate_str();
                  let rate_3 = data_3.to_rate(c_data_3).rate_str();

                  for (let i = 0;i < 4;i++) {
                    app +=
                    `
                    <td>
                      <div class="amount">
                        ${eval(`data_${i}`).toLocaleString()}
                        <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                      </div>
                      <div class="rate">${eval(`rate_${i}`)}</div>
                    </td>
                    `;
                  }
                } else {
                  for (let i = 0;i < 4;i++) {
                    app +=
                    `
                    <td>
                      <div class="amount">
                        ${eval(`data_${i}`).toLocaleString()}
                        <span>(0)</span>
                      </div>
                      <div class="rate">-%</div>
                    </td>
                    `;
                  }
                }
              }
              ap +=
              `
              <tr>
                <th>
                  <a href="/achieve_analytics?st=1&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
                    ${user_name==MSD_smn?`${stna[1]}${cell.obj_id}`: cell.obj_name}
                  </a>
                </th>
                ${app}
              </tr>
              `;
            });
            $('#clinic_table_base').html(
              `
              <table id="clinic_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>自費売上</th>
                    <th>来院数</th>
                    <th>純患数</th>
                    <th>新患数</th>
                  </tr>
                </thead>
                <tbody>${ap}</tbody>
              </table>
              `
            );
            let table = $('#clinic_table').DataTable({
              columnDefs:[{type:'currency',targets:[1,2,3,4]}],
              displayLength:10,
              lengthChange: false,
              searching: true,
              ordering: true,
              info: true,
              paging: true,
              order:[[1,"desc"]]
            });
          }
          const desc_cus = () => {
            let sum_geneder_0 = obj.sum_val(`geneder_0`);
            let sum_geneder_1 = obj.sum_val(`geneder_1`);
            let sum_geneder_2 = obj.sum_val(`geneder_2`);
            let sum_geneder_3 = obj.sum_val(`geneder_3`);
            let sum_geneder_4 = obj.sum_val(`geneder_4`);
            let sum_geneder_5 = obj.sum_val(`geneder_5`);
            let sum_geneder_6 = obj.sum_val(`geneder_6`);
            let sum_geneder_7 = obj.sum_val(`geneder_7`);
            let sum_geneder_8 = obj.sum_val(`geneder_8`);
            let sum_geneder_9 = obj.sum_val(`geneder_9`);

            let ap = ``;
            obj.forEach((cell) => {
              let geneder_0 = cell.geneder_0;
              let geneder_1 = cell.geneder_1;
              let geneder_2 = cell.geneder_2;
              let geneder_3 = cell.geneder_3;
              let geneder_4 = cell.geneder_4;
              let geneder_5 = cell.geneder_5;
              let geneder_6 = cell.geneder_6;
              let geneder_7 = cell.geneder_7;
              let geneder_8 = cell.geneder_8;
              let geneder_9 = cell.geneder_9;


              let app = ``;

              if (!cpt) {
                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  let sum_geneder = eval(`sum_geneder_${i}`);

                  let rate = geneder.to_perate(sum_geneder);

                  app +=
                  `
                  <td>
                    <div class="amount">${geneder.str_jp()} <span class="percent">${rate}%</span></div>
                    <div class="bb" style="width:${rate}%;"></div>
                  </td>
                  `;
                }
              } else {
                let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
                if (c_cell.exist_val()) {
                  let c_geneder_0 = c_cell.sum_val(`geneder_0`);
                  let c_geneder_1 = c_cell.sum_val(`geneder_1`);
                  let c_geneder_2 = c_cell.sum_val(`geneder_2`);
                  let c_geneder_3 = c_cell.sum_val(`geneder_3`);
                  let c_geneder_4 = c_cell.sum_val(`geneder_4`);
                  let c_geneder_5 = c_cell.sum_val(`geneder_5`);
                  let c_geneder_6 = c_cell.sum_val(`geneder_6`);
                  let c_geneder_7 = c_cell.sum_val(`geneder_7`);
                  let c_geneder_8 = c_cell.sum_val(`geneder_8`);
                  let c_geneder_9 = c_cell.sum_val(`geneder_9`);

                  for (let i = 0;i < 10;i++) {
                    let geneder = eval(`geneder_${i}`);
                    let c_geneder = eval(`c_geneder_${i}`);

                    let rate = geneder.to_rate(c_geneder).rate_str();
                    app +=
                    `
                    <td>
                      <div class="amount">${geneder.str_jp()} <span>(${c_geneder.toLocaleString()})</span></div>
                      <div class="rate">${rate}</div>
                    </td>
                    `;
                  }
                } else {
                  for (let i = 0;i < 10;i++) {
                    app +=
                    `
                    <td>
                      <div class="rate">-%</div>
                      <div class="amount">${eval(`data_${i}`).toLocaleString()} <span>(0)</span></div>
                    </td>
                    `;
                  }
                }
              }
              ap +=
              `
              <tr>
                <th>
                  <a href="/achieve_analytics?st=1&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
                    ${user_name==MSD_smn?`${stna[1]}${cell.obj_id}`: cell.obj_name}
                  </a>
                </th>
                ${app}
              </tr>
              `;
            });

            $('#clinic_customer_table_base').html(
              `
              <table id="clinic_customer_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>未成年 男性</th>
                    <th>未成年 女性</th>
                    <th>20~34歳 男性</th>
                    <th>20~34歳 女性</th>
                    <th>34~64歳 男性</th>
                    <th>34~64歳 女性</th>
                    <th>65~74歳 男性</th>
                    <th>65~74歳 女性</th>
                    <th>75歳~ 男性</th>
                    <th>75歳~ 女性</th>
                  </tr>
                </thead>
                <tbody>${ap}</tbody>
              </table>
              `
            );
            let table = $('#clinic_customer_table').DataTable({
              columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10]}],
              displayLength:5,
              lengthChange: false,
              searching: false,
              ordering: true,
              info: false,
              paging: true,
              order:[[1,"desc"]]
            });
          }

          setTimeout(() => {
            desc_pie();
            setTimeout(() => {
              desc_plot();
            },500);
          },250);
          desc_table();
          desc_cus();
        }
        const desc_staffs = () => {
          let obj = data.data.sf;
          let c_obj = data.cdata.sf;
          if (!obj.exist_val()) return;
          let cls = data.data.cls.data.split(',').map((label) => {return {id:Number(label)};});

          let sum_data_0 = obj.sum_val(`data_0`);
          let sum_data_1 = obj.sum_val(`data_1`);
          let sum_data_2 = obj.sum_val(`data_2`);
          let sum_data_3 = obj.sum_val(`data_3`);

          const desc_pie = () => {
            let data_arr = [];
            for (let i = 0;i < 5;i++) {
              if (i >= obj.length) continue;
              let cell = obj[i];
              data_arr.push(cell.data_0);
            }
            if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

            let graph_plugin = {
              afterDatasetsDraw: function (chart, easing) {
                var ctx = chart.ctx;
                chart.data.datasets.forEach(function (dataset, i) {
                  var meta = chart.getDatasetMeta(i);
                  if (!meta.hidden) {
                    meta.data.forEach(function (element, index) {
                      ctx.fillStyle = "white";
                      var fontSize = 8;
                      var fontStyle = 'normal';
                      var fontFamily = 'Helvetica Neue';
                      ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                      let amount = data_arr[index].to_perate(sum_data_0);
                      var dataString =
                      amount > 0 ? [`${amount}%`] : [``];
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
                      var padding = 5;
                      var position = element.tooltipPosition();
                      ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                    });
                  }
                });
              }
            }
            let graph_data = [{
              data:data_arr,
              backgroundColor:pgca,
              borderColor:"",
              borderWidth:0,
            }];
            let graph_option = {
              maintainAspectRatio: true,
              responsive: true,
              cutoutPercentage:0,
              title: {display:false,fontSize:12,fontStyle:500,text: ''},
              pieceLabel: {render: 'label',position: 'outside'},
              tooltips:{
                callbacks: {
                  title:function(t,d) {
                    let index = t[0].index;
                    let name = index != 5 ? obj[index].obj_name : `その他`;
                    return `${name}`;
                  },
                  label: function(t,d) {
                    let index = t.index;
                    let amount = data_arr[index];
                    return `¥${amount.toLocaleString()}`;
                  }
                }
              }
            }
            staff_pie.data = {
              labels:"",
              datasets:graph_data,
            };
            staff_pie.config.plugins = [graph_plugin];
            staff_pie.options = graph_option;
            staff_pie.update();
          }
          const desc_plot = () => {
            let data_0_arr = [];
            let data_1_arr = [];
            let data_2_arr = [];
            let data_c_0_arr = [];
            let data_c_1_arr = [];
            let data_c_2_arr = [];

            obj.forEach((cell) => {
              data_0_arr.push(cell.data_1);
              data_1_arr.push(cell.data_2);
              data_2_arr.push(cell.data_3);
            });
            if (cpt) {
              c_obj.forEach((cell) => {
                data_c_0_arr.push(cell.data_1);
                data_c_1_arr.push(cell.data_2);
                data_c_2_arr.push(cell.data_3);
              });
            }
            let graph_data = [];

            graph_data = [{
              label:"当期",
              backgroundColor:'rgba(54,100,180,.5)',
              borderColor:'rgba(54,100,180,1)',
              borderWidth: 1.5,
              outlierColor: '#999999',
              padding: 10,
              itemRadius: 0,
              data: [data_0_arr,data_1_arr,data_2_arr],
            }];
            if (cpt) {
              graph_data.push({
                label:"前期",
                backgroundColor:'rgba(242,100,100,.5)',
                borderColor:'rgb(242,100,100)',
                borderWidth: 1.5,
                outlierColor: '#999999',
                padding: 10,
                itemRadius: 0,
                data: [data_c_0_arr,data_c_1_arr,data_c_2_arr],
              });
            }
            let graph_option = {
              maintainAspectRatio:true,
              responsive: true,
              legend:{labels:{fontSize:10,boxWidth:24}},
              title: {display:false},
              scales: {
                yAxes: [{
                  gridLines: {
                    display:true,
                    drawBorder: false,
                    zeroLineColor:"#eee",
                    color:"#eee"
                  },
                  ticks: {
                    autoSkip: true,
                    fontSize:8,
                    maxTicksLimit:6,
                    callback: function(label, index, labels) {
                      return label.str_jp();
                    }
                  },
                }],
                xAxes: [{
                  ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    fontSize:8,
                    autoSkip: true,
                  },
                  gridLines: {
                    display:false,
                    drawBorder: false,
                  },
                  scaleLabel: {
                    display: false,
                  }
                }]
              },
              tooltips:{
                bodySpacing:5,
                titleFontSize:12.5,
                bodyFontSize:15,
                intersect:false,
                axis:'x',
                mode:'index',
              }
            }
            staff_boxplot.data = {
              labels:["施術回数","純患数","新患数"],
              datasets:graph_data,
            };
            staff_boxplot.options = graph_option;
            staff_boxplot.update();
          }
          const desc_table = () => {
            let ap = ``;
            obj.forEach((cell) => {
              let data_0 = cell.data_0;
              let data_1 = cell.data_1;
              let data_2 = cell.data_2;
              let data_3 = cell.data_3;

              let app = ``;

              if (!cpt) {
                let rate_0 = data_0.to_perate(sum_data_0);
                let rate_1 = data_1.to_perate(sum_data_1);
                let rate_2 = data_2.to_perate(sum_data_2);
                let rate_3 = data_3.to_perate(sum_data_3);

                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span class="percent">${eval(`rate_${i}`)}%</span>
                    </div>
                    <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                  </td>
                  `;
                }
              } else {
                let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
                if (c_cell.exist_val()) {
                  let c_data_0 = c_cell.sum_val(`data_0`);
                  let c_data_1 = c_cell.sum_val(`data_1`);
                  let c_data_2 = c_cell.sum_val(`data_2`);
                  let c_data_3 = c_cell.sum_val(`data_3`);

                  let rate_0 = data_0.to_rate(c_data_0).rate_str();
                  let rate_1 = data_1.to_rate(c_data_1).rate_str();
                  let rate_2 = data_2.to_rate(c_data_2).rate_str();
                  let rate_3 = data_3.to_rate(c_data_3).rate_str();

                  for (let i = 0;i < 4;i++) {
                    app +=
                    `
                    <td>
                      <div class="amount">
                        ${eval(`data_${i}`).toLocaleString()}
                        <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                      </div>
                      <div class="rate">${eval(`rate_${i}`)}</div>
                    </td>
                    `;
                  }
                } else {
                  for (let i = 0;i < 4;i++) {
                    app +=
                    `
                    <td>
                      <div class="amount">
                        ${eval(`data_${i}`).toLocaleString()}
                        <span>(0)</span>
                      </div>
                      <div class="rate">-%</div>
                    </td>
                    `;
                  }
                }
              }
              let link = ``;
              if (cls.filter(({id}) => id == cell.obj_clinic_id).exist_val()) {
                link =
                `
                <a href="/achieve_analytics?st=2&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
                  ${user_name==MSD_smn?`${stna[2]}${cell.obj_id}`: cell.obj_name}
                </a>
                `;
              } else {
                link = `${user_name==MSD_smn?`${stna[1]}${cell.obj_id}`: cell.obj_name}`;
              }

              ap +=
              `
              <tr>
                <th>${link}</th>
                ${app}
              </tr>
              `;
            });
            $('#staff_table_base').html(
              `
              <table id="staff_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>自費売上</th>
                    <th>施術回数</th>
                    <th>純患数</th>
                    <th>新患数</th>
                  </tr>
                </thead>
                <tbody>${ap}</tbody>
              </table>
              `
            );
            let table = $('#staff_table').DataTable({
              columnDefs:[{type:'currency',targets:[1,2,3,4]}],
              displayLength:10,
              lengthChange: false,
              searching: true,
              ordering: true,
              info: true,
              paging: true,
              order:[[1,"desc"]]
            });
          }
          const desc_cus = () => {
            let sum_geneder_0 = obj.sum_val(`geneder_0`);
            let sum_geneder_1 = obj.sum_val(`geneder_1`);
            let sum_geneder_2 = obj.sum_val(`geneder_2`);
            let sum_geneder_3 = obj.sum_val(`geneder_3`);
            let sum_geneder_4 = obj.sum_val(`geneder_4`);
            let sum_geneder_5 = obj.sum_val(`geneder_5`);
            let sum_geneder_6 = obj.sum_val(`geneder_6`);
            let sum_geneder_7 = obj.sum_val(`geneder_7`);
            let sum_geneder_8 = obj.sum_val(`geneder_8`);
            let sum_geneder_9 = obj.sum_val(`geneder_9`);

            let ap = ``;
            obj.forEach((cell) => {
              let geneder_0 = cell.geneder_0;
              let geneder_1 = cell.geneder_1;
              let geneder_2 = cell.geneder_2;
              let geneder_3 = cell.geneder_3;
              let geneder_4 = cell.geneder_4;
              let geneder_5 = cell.geneder_5;
              let geneder_6 = cell.geneder_6;
              let geneder_7 = cell.geneder_7;
              let geneder_8 = cell.geneder_8;
              let geneder_9 = cell.geneder_9;


              let app = ``;

              if (!cpt) {
                for (let i = 0;i < 10;i++) {
                  let geneder = eval(`geneder_${i}`);
                  let sum_geneder = eval(`sum_geneder_${i}`);

                  let rate = geneder.to_perate(sum_geneder);

                  app +=
                  `
                  <td>
                    <div class="amount">${geneder.str_jp()} <span class="percent">${rate}%</span></div>
                    <div class="bb" style="width:${rate}%;"></div>
                  </td>
                  `;
                }
              } else {
                let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
                if (c_cell.exist_val()) {
                  let c_geneder_0 = c_cell.sum_val(`geneder_0`);
                  let c_geneder_1 = c_cell.sum_val(`geneder_1`);
                  let c_geneder_2 = c_cell.sum_val(`geneder_2`);
                  let c_geneder_3 = c_cell.sum_val(`geneder_3`);
                  let c_geneder_4 = c_cell.sum_val(`geneder_4`);
                  let c_geneder_5 = c_cell.sum_val(`geneder_5`);
                  let c_geneder_6 = c_cell.sum_val(`geneder_6`);
                  let c_geneder_7 = c_cell.sum_val(`geneder_7`);
                  let c_geneder_8 = c_cell.sum_val(`geneder_8`);
                  let c_geneder_9 = c_cell.sum_val(`geneder_9`);

                  for (let i = 0;i < 10;i++) {
                    let geneder = eval(`geneder_${i}`);
                    let c_geneder = eval(`c_geneder_${i}`);

                    let rate = geneder.to_rate(c_geneder).rate_str();
                    app +=
                    `
                    <td>
                      <div class="amount">${geneder.str_jp()} <span>(${c_geneder.toLocaleString()})</span></div>
                      <div class="rate">${rate}</div>
                    </td>
                    `;
                  }
                } else {
                  for (let i = 0;i < 10;i++) {
                    app +=
                    `
                    <td>
                      <div class="rate">-%</div>
                      <div class="amount">${eval(`data_${i}`).toLocaleString()} <span>(0)</span></div>
                    </td>
                    `;
                  }
                }
              }
              ap +=
              `
              <tr>
                <th>
                  <a href="/achieve_analytics?st=2&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
                    ${user_name==MSD_smn?`${stna[2]}${cell.obj_id}`: cell.obj_name}
                  </a>
                </th>
                ${app}
              </tr>
              `;
            });

            $('#staff_customer_table_base').html(
              `
              <table id="staff_customer_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>未成年 男性</th>
                    <th>未成年 女性</th>
                    <th>20~34歳 男性</th>
                    <th>20~34歳 女性</th>
                    <th>34~64歳 男性</th>
                    <th>34~64歳 女性</th>
                    <th>65~74歳 男性</th>
                    <th>65~74歳 女性</th>
                    <th>75歳~ 男性</th>
                    <th>75歳~ 女性</th>
                  </tr>
                </thead>
                <tbody>${ap}</tbody>
              </table>
              `
            );
            let table = $('#staff_customer_table').DataTable({
              columnDefs:[{type:'currency',targets:[1,2,3,4,5,6,7,8,9,10]}],
              displayLength:5,
              lengthChange: false,
              searching: false,
              ordering: true,
              info: false,
              paging: true,
              order:[[1,"desc"]]
            });
          }

          setTimeout(() => {
            desc_pie();
            setTimeout(() => {
              desc_plot();
            },500);
          },250);
          desc_table();
          desc_cus();
        }
        const desc_customers = () => {
          let obj = data.data.cs;
          let c_obj = data.cdata.cs;
          if (!obj.exist_val()) return;

          let sum_data_0 = obj.sum_val(`data_0`);
          let sum_data_1 = obj.sum_val(`data_1`);
          let sum_data_2 = obj.sum_val(`data_2`);
          let sum_data_3 = obj.sum_val(`data_3`);

          const desc_pie = () => {
            let data_arr = [];
            for (let i = 0;i < 5;i++) {
              if (i >= obj.length) continue;
              let cell = obj[i];
              data_arr.push(cell.data_0);
            }
            if (obj.length >= 6) data_arr.push(sum_data_0 - data_arr.sum_val(``));

            let graph_plugin = {
              afterDatasetsDraw: function (chart, easing) {
                var ctx = chart.ctx;
                chart.data.datasets.forEach(function (dataset, i) {
                  var meta = chart.getDatasetMeta(i);
                  if (!meta.hidden) {
                    meta.data.forEach(function (element, index) {
                      ctx.fillStyle = "white";
                      var fontSize = 8;
                      var fontStyle = 'normal';
                      var fontFamily = 'Helvetica Neue';
                      ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                      let amount = data_arr[index].to_perate(sum_data_0);
                      var dataString =
                      amount > 0 ? [`${amount}%`] : [``];
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
                      var padding = 5;
                      var position = element.tooltipPosition();
                      ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                    });
                  }
                });
              }
            }
            let graph_data = [{
              data:data_arr,
              backgroundColor:pgca,
              borderColor:"",
              borderWidth:0,
            }];
            let graph_option = {
              maintainAspectRatio: true,
              responsive: true,
              cutoutPercentage:0,
              title: {display:false,fontSize:12,fontStyle:500,text: ''},
              pieceLabel: {render: 'label',position: 'outside'},
              tooltips:{
                callbacks: {
                  title:function(t,d) {
                    let index = t[0].index;
                    let name = index != 5 ? obj[index].obj_name : `その他`;
                    return `${name}`;
                  },
                  label: function(t,d) {
                    let index = t.index;
                    let amount = data_arr[index];
                    return `¥${amount.toLocaleString()}`;
                  }
                }
              }
            }
            customer_pie.data = {
              labels:"",
              datasets:graph_data,
            };
            customer_pie.config.plugins = [graph_plugin];
            customer_pie.options = graph_option;
            customer_pie.update();
          }
          const desc_plot = () => {
            let data_0_arr = [];
            let data_1_arr = [];
            let data_2_arr = [];
            let data_c_0_arr = [];
            let data_c_1_arr = [];
            let data_c_2_arr = [];

            obj.forEach((cell) => {
              data_0_arr.push(cell.data_1);
              data_1_arr.push(cell.data_2);
              data_2_arr.push(cell.data_3);
            });
            if (cpt) {
              c_obj.forEach((cell) => {
                data_c_0_arr.push(cell.data_1);
                data_c_1_arr.push(cell.data_2);
                data_c_2_arr.push(cell.data_3);
              });
            }
            let graph_data = [];

            graph_data = [{
              label:"当期",
              backgroundColor:'rgba(54,100,180,.5)',
              borderColor:'rgba(54,100,180,1)',
              borderWidth: 1.5,
              outlierColor: '#999999',
              padding: 10,
              itemRadius: 0,
              data: [data_0_arr,data_1_arr,data_2_arr],
            }];
            if (cpt) {
              graph_data.push({
                label:"前期",
                backgroundColor:'rgba(242,100,100,.5)',
                borderColor:'rgb(242,100,100)',
                borderWidth: 1.5,
                outlierColor: '#999999',
                padding: 10,
                itemRadius: 0,
                data: [data_c_0_arr,data_c_1_arr,data_c_2_arr],
              });
            }
            let graph_option = {
              maintainAspectRatio:true,
              responsive: true,
              legend:{labels:{fontSize:10,boxWidth:24}},
              title: {display:false},
              scales: {
                yAxes: [{
                  gridLines: {
                    display:true,
                    drawBorder: false,
                    zeroLineColor:"#eee",
                    color:"#eee"
                  },
                  ticks: {
                    autoSkip: true,
                    fontSize:8,
                    maxTicksLimit:6,
                    callback: function(label, index, labels) {
                      return label.str_jp();
                    }
                  },
                }],
                xAxes: [{
                  ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    fontSize:8,
                    autoSkip: true,
                  },
                  gridLines: {
                    display:false,
                    drawBorder: false,
                  },
                  scaleLabel: {
                    display: false,
                  }
                }]
              },
              tooltips:{
                bodySpacing:5,
                titleFontSize:12.5,
                bodyFontSize:15,
                intersect:false,
                axis:'x',
                mode:'index',
              }
            }
            customer_boxplot.data = {
              labels:["施術回数","純患数","新患数"],
              datasets:graph_data,
            };
            customer_boxplot.options = graph_option;
            customer_boxplot.update();
          }
          const desc_table = () => {
            let ap = ``;
            obj.forEach((cell) => {
              let data_0 = cell.data_0;
              let data_1 = cell.data_1;
              let data_2 = cell.data_2;
              let data_3 = cell.data_3;

              let app = ``;

              if (!cpt) {
                let rate_0 = data_0.to_perate(sum_data_0);
                let rate_1 = data_1.to_perate(sum_data_1);
                let rate_2 = data_2.to_perate(sum_data_2);
                let rate_3 = data_3.to_perate(sum_data_3);

                for (let i = 0;i < 4;i++) {
                  app +=
                  `
                  <td>
                    <div class="amount">
                      ${eval(`data_${i}`).toLocaleString()}
                      <span class="percent">${eval(`rate_${i}`)}%</span>
                    </div>
                    <div class="bb" style="width:${eval(`rate_${i}`)}%;"></div>
                  </td>
                  `;
                }
              } else {
                let c_cell = c_obj.filter(({obj_id}) => obj_id == cell.obj_id);
                if (c_cell.exist_val()) {
                  let c_data_0 = c_cell.sum_val(`data_0`);
                  let c_data_1 = c_cell.sum_val(`data_1`);
                  let c_data_2 = c_cell.sum_val(`data_2`);
                  let c_data_3 = c_cell.sum_val(`data_3`);

                  let rate_0 = data_0.to_rate(c_data_0).rate_str();
                  let rate_1 = data_1.to_rate(c_data_1).rate_str();
                  let rate_2 = data_2.to_rate(c_data_2).rate_str();
                  let rate_3 = data_3.to_rate(c_data_3).rate_str();

                  for (let i = 0;i < 4;i++) {
                    app +=
                    `
                    <td>
                      <div class="amount">
                        ${eval(`data_${i}`).toLocaleString()}
                        <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
                      </div>
                      <div class="rate">${eval(`rate_${i}`)}</div>
                    </td>
                    `;
                  }
                } else {
                  for (let i = 0;i < 4;i++) {
                    app +=
                    `
                    <td>
                      <div class="amount">
                        ${eval(`data_${i}`).toLocaleString()}
                        <span>(0)</span>
                      </div>
                      <div class="rate">-%</div>
                    </td>
                    `;
                  }
                }
              }
              ap += `<tr><th>${cell.obj_name}</th>${app}</tr>`;
            });
            $('#customer_table_base').html(
              `
              <table id="customer_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>自費売上</th>
                    <th>来院数</th>
                    <th>純患数</th>
                    <th>新患数</th>
                  </tr>
                </thead>
                <tbody>${ap}</tbody>
              </table>
              `
            );
            let table = $('#customer_table').DataTable({
              columnDefs:[{type:'currency',targets:[1,2,3,4]}],
              displayLength:10,
              lengthChange: false,
              searching: true,
              ordering: true,
              info: true,
              paging: true,
              order:[[1,"desc"]]
            });
          }

          setTimeout(() => {
            desc_pie();
            setTimeout(() => {
              desc_plot();
            },500);
          },250);
          desc_table();
        }

        desc_clinics();
        setTimeout(() => {desc_staffs();},250);
        setTimeout(() => {desc_customers();},750);
      }

      desc_static_sections();
    }


    desc_content_leveling();
    const desc_graph_init = (sender1,sender2,sender3,sender4) => {
      eval(`try {${sender1}.destroy();} catch(err) {}`);
      eval(`${sender2}.canvas.height = 100;`);
      eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
    }

    let clinic_pie;
    let clinic_boxplot;
    let staff_pie;
    let staff_boxplot;
    let customer_pie;
    let customer_boxplot;

    let clinic_pie_ctx = st == 0 ? document.getElementById('clinic_pie').getContext('2d') : ``;
    st == 0 ? desc_graph_init("clinic_pie","clinic_pie_ctx",'pie') : console.log();
    let clinic_boxplot_ctx = st == 0 ? document.getElementById('clinic_boxplot').getContext('2d') : ``;
    st == 0 ? desc_graph_init("clinic_boxplot","clinic_boxplot_ctx",'boxplot') : console.log();

    let staff_pie_ctx = st <= 1 ? document.getElementById('staff_pie').getContext('2d') : ``;
    st <= 1 ? desc_graph_init("staff_pie","staff_pie_ctx",'pie') : console.log();
    let staff_boxplot_ctx = st <= 1 ? document.getElementById('staff_boxplot').getContext('2d') : ``;
    st <= 1 ? desc_graph_init("staff_boxplot","staff_boxplot_ctx",'boxplot') : console.log();

    let customer_pie_ctx = document.getElementById('customer_pie').getContext('2d');
    desc_graph_init("customer_pie","customer_pie_ctx",'pie');
    let customer_boxplot_ctx = document.getElementById('customer_boxplot').getContext('2d');
    desc_graph_init("customer_boxplot","customer_boxplot_ctx",'boxplot');

    const ajax = async () => {
      let result = await desc_menu_query_data(bt);
      if (result.dataExists) {
        desc_menu_content(result.data);
      } else {
        alert(`データ通信エラー:${result.reason}`);
      }
    }
    $(document).off('click','#menu_query_btn').on('click','#menu_query_btn',function() {
      ajax();
    });
    ajax();
  } else if (bt == 5) {
    if (!data.data.data.exist_val()) {
      $('#content_base').html(`<div class="loading_base inline">データがありません。</div>`);
      return;
    }

    let datas = data.data.data;
    let c_datas = data.cdata.data;

    let cls = data.data.cls.data.split(',').map((label) => {return {id:Number(label)};});
    let oa = [datas,datas.filter(({min_rep}) => min_rep == 1),datas.filter(({min_rep}) => min_rep != 1)];
    let coa = [c_datas,c_datas.filter(({min_rep}) => min_rep == 1),c_datas.filter(({min_rep}) => min_rep != 1)];

    const desc_content_leveling = () => {
      let cl_s =
      st == 0
      ? `
      <div class="cell cell_1x1 inline">
        <div class="box cell_link">
          <div class="cell_title text_overflow">院別平均来院数</div>
          <div class="content _repeat_">
            <div class="base">
              <div class="table_base no_border" id="clinic_table_base">
              </div>
            </div>
          </div>
        </div>
      </div>`
      : ``;

      let sf_s =
      st <= 1
      ? `
      <div class="cell cell_1x1 inline">
        <div class="box cell_link">
          <div class="cell_title text_overflow">
            初回担当者
            <div class="icon inline">
              <i class="fas fa-question-circle help_tips" data-title="初回担当者別平均来院回数" data-help="期間内の1回目の来院時に担当した顧客がその後どの程度来院したかを分析するセクションです。"></i>
            </div>
          </div>
          <div class="content _repeat_">
            <div class="base">
              <div class="table_base no_border" id="staff_table_base">
              </div>
            </div>
          </div>
        </div>
      </div>`
      : ``;
      $('#content_base').html(
        `
        <div class="section">
          <div class="section_title">
            顧客属性別の概要
            <div class="icon inline">
              <i class="fas fa-question-circle help_tips" data-title="純患数の定義" data-help="このセクションの純患数の定義は指定期間中初来院時に担当された数値です。店舗セグメントでのこの純患数は他のそれと同値ですが、担当者では値が異なります。"></i>
            </div>
          </div>
          <div class="cell_btn_box cell3_btn_box" id="cell_btn_box">
          </div>

          <div class="cells_box">
            <div class="cell cell_2ax1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">自費売上と累計比率</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="continue_line" width="300" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_2ax1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">売上効率</div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="money_line" width="300" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="segment_box">
            <div class="table_base table_base1 table_base2 no_border" id="continue_table_base">
            </div>
          </div>
          <div class="cells_box">
            <div class="cell cell_4x1 inline">
              <div class="box">
                <div class="cell_title text_overflow">セグメント分析</div>
                <div class="content _repeat_segment_">
                  <div class="base">
                    <div class="repeat_base">
                      <div class="graph_base">
                        <div class="indi_title">
                          <div class="indi indi_0 inline"><i class="fas fa-stop"></i> 継続</div>
                          <div class="indi indi_1 inline"><i class="fas fa-stop"></i> 完治</div>
                          <div class="indi indi_2 inline"><i class="fas fa-stop"></i> 離脱</div>
                        </div>
                        <div id="repeat_segment_base">
                        </div>
                      </div>
                      <div class="segm">
                        <div class="segmb">
                          <div class="row">
                            <div class="row_title row_title_0"><i class="fas fa-stop"></i> 継続</div>
                            <div class="graph_wrap"><canvas id="rstgb0" width="375" height="100"></canvas></div>
                            <div class="btn_base desktop_elm"><button id="rstbtn0"><i class="fas fa-file-excel"></i> 顧客一覧.xlsx</button></div>
                          </div>
                          <div class="row">
                            <div class="row_title row_title_1"><i class="fas fa-stop"></i> 離脱</div>
                            <div class="graph_wrap"><canvas id="rstgb1" width="375" height="100"></canvas></div>
                            <div class="btn_base desktop_elm"><button id="rstbtn1"><i class="fas fa-file-excel"></i> 顧客一覧.xlsx</button></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_4x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">マッピング
                </div>
                <div class="content _map_">
                  <div class="base">
                    <div class="cover">
                    <button id="open_map">マップを表示する</button>
                    </div>
                    <div id="map_sum_base" style="font-size:.8rem;">
                    </div>
                    <div class="filter_base" id="customer_filter_base">
                      <input type="checkbox" name="map_customer_" id="map_customer_0" checked>
                      <label for="map_customer_0">
                        <img class="inline" src="/assets/man_100b.png">
                        1回来院
                      </label>
                      <input type="checkbox" name="map_customer_" id="map_customer_1" checked>
                      <label for="map_customer_1">
                        <img class="inline" src="/assets/man_100y.png">
                        2~5回来院
                      </label>
                      <input type="checkbox" name="map_customer_" id="map_customer_2" checked>
                      <label for="map_customer_2">
                        <img class="inline" src="/assets/man_100r.png">
                        5回~来院
                      </label>
                    </div>
                    <div class="filter_base padding_01px" id="clinic_filter_base">
                    </div>
                    <div id="canvas_map">
                    </div>
                    <div class="indi_base">
                      <div class="cel">
                        <img class="inline" src="/assets/man_100b.png">
                        <div class="amount inline" id="indi_sum_map_0">
                        </div>
                      </div>
                      <div class="cel">
                        <img class="inline" src="/assets/man_100y.png">
                        <div class="amount inline" id="indi_sum_map_1">
                        </div>
                      </div>
                      <div class="cel">
                        <img class="inline" src="/assets/man_100r.png">
                        <div class="amount inline" id="indi_sum_map_2">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">男女年代別平均来院数</div>
                <div class="content _repeat_">
                  <div class="base">
                    <div class="table_base no_border" id="geneder_table_base"></div>
                  </div>
                </div>
              </div>
            </div>
            ${cl_s}
            ${sf_s}
            <div class="cell cell_1x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">
                  初回来院動機
                </div>
                <div class="content _repeat_">
                  <div class="base">
                    <div class="table_base no_border" id="visit_reason_table_base"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
      );
    }
    const desc_cells_btn = () => {
      let col_name = ["全体","新規","既存"];
      let col_icon = [`ALL`,`<i class="fas fa-user"></i>`,`<i class="fad fa-users"></i>`];

      let sum_data_0 = oa[0].length;
      let sum_data_1 = oa[0].sum_val(`data_3`);

      let sum_c_data_0 = coa[0].length;
      let sum_c_data_1 = coa[0].sum_val(`data_3`);

      let ap = ``;
      for (let i = 0;i < 3;i++) {
        let data_0 = oa[i].length;
        let data_1 = oa[i].sum_val(`data_3`);
        let data_2 = data_1.to_Perate(data_0);

        let rate_0 = data_0.to_perate(sum_data_0);
        let rate_1 = data_1.to_perate(sum_data_1);

        if (!cpt) {
          ap +=
          `
          <input type="radio" name="cell_input_" id="cell_input_${i}">
          <label class="cell inline" for="cell_input_${i}">
            <div class="box box_s">
              <div class="cell_title">
                <span class="icon inline">${col_icon[i]}</span> ${col_name[i]}
              </div>
              <div class="contents">
                <div class="row">
                  <div class="indi">純患数</div>
                  <div class="amounts text_overflow">
                    ${data_0.str_jp()}人
                    <span>(${rate_0}%)</span>
                    <br>
                    <div class="bb"><div class="b" style="width:${rate_0}%;"></div></div>
                  </div>
                </div>
                <div class="row">
                  <div class="indi">総来院数</div>
                  <div class="amounts text_overflow">
                    ${data_1.str_jp()}人
                    <span>(${rate_1}%)</span>
                    <div class="bb"><div class="b" style="width:${rate_1}%;"></div></div>
                  </div>
                </div>
                <div class="row">
                  <div class="indi">平均来院数</div>
                  <div class="amounts text_overflow">
                    ${data_2.str_jp()}回
                  </div>
                </div>
              </div>
            </div>
          </label>
          `;
        } else {
          let c_data_0 = coa[i].length;
          let c_data_1 = coa[i].sum_val(`data_3`);
          let c_data_2 = c_data_1.to_Perate(c_data_0);

          let c_rate_0 = c_data_0.to_perate(sum_c_data_0);
          let c_rate_1 = c_data_1.to_perate(sum_c_data_1);

          ap +=
          `
          <input type="radio" name="cell_input_" id="cell_input_${i}">
          <label class="cell inline" for="cell_input_${i}">
            <div class="box box_s box_se">
              <div class="cell_title">
              <span class="icon inline">${col_icon[i]}</span> ${col_name[i]}
              </div>
              <div class="contents">
                <div class="row">
                  <div class="indi">純患数</div>
                  <div class="amounts text_overflow">
                    ${data_0.str_jp()}人
                    <span>(${rate_0}%)</span>
                    <br>
                    <div class="bb"><div class="b" style="width:${rate_0}%;"></div></div>
                  </div>
                  <div class="amounts amounts_se text_overflow">
                    ${c_data_0.str_jp()}人
                    <span>(${c_rate_0}%)</span>
                    <br>
                    <div class="bb"><div class="b b_se" style="width:${c_rate_0}%;"></div></div>
                  </div>
                </div>
                <div class="row">
                  <div class="indi">総来院数</div>
                  <div class="amounts text_overflow">
                    ${data_1.str_jp()}人
                    <span>(${rate_1}%)</span>
                    <div class="bb"><div class="b" style="width:${rate_1}%;"></div></div>
                  </div>
                  <div class="amounts amounts_se text_overflow">
                    ${c_data_1.str_jp()}人
                    <span>(${c_rate_1}%)</span>
                    <div class="bb"><div class="b b_se" style="width:${c_rate_1}%;"></div></div>
                  </div>
                </div>
                <div class="row">
                  <div class="indi">平均来院数</div>
                  <div class="amounts text_overflow">${data_2.str_jp()}回</div>
                  <div class="amounts amounts_se text_overflow">${c_data_2.str_jp()}回</div>
                </div>
              </div>
            </div>
          </label>
          `;
        }
      }
      $('#cell_btn_box').html(ap);
    }
    const desc_dynamic_sections = (ct) => {
      (() => {
        $(`#cell_input_${ct}`).prop('checked',true);
        $('.cell_link').addClass('select_shadow');
        setTimeout(() => {$('.cell_link').removeClass('select_shadow');},1000);
      })();

      let gro = [
        {id:0,name:"12歳以下 男性"},
        {id:1,name:"12歳以下 女性"},
        {id:2,name:"19歳以下 男性"},
        {id:3,name:"19歳以下 女性"},
        {id:4,name:"20代 男性"},
        {id:5,name:"20代 女性"},
        {id:6,name:"30代 男性"},
        {id:7,name:"30代 女性"},
        {id:8,name:"40代 男性"},
        {id:9,name:"40代 女性"},
        {id:10,name:"50代 男性"},
        {id:11,name:"50代 女性"},
        {id:12,name:"60代 男性"},
        {id:13,name:"60代 女性"},
        {id:14,name:"70歳以上 男性"},
        {id:15,name:"70歳以上 女性"}
      ];

      let objs = oa[ct];
      let c_objs = coa[ct];

      const desc_trend_section = () => {
        let tpl = [];

        let data_00_arr = [100];
        let data_01_arr = [null];
        let data_10_arr = [];
        let data_11_arr = [];
        let data_20_arr = [objs.length];
        let data_21_arr = [];

        let c_data_00_arr = [100];
        let c_data_01_arr = [null];
        let c_data_10_arr = [];
        let c_data_11_arr = [];
        let c_data_20_arr = [c_objs.length];
        let c_data_21_arr = [];

        let sum_data_0 = objs.sum_val(`data_0`);
        let sum_c_data_0 = c_objs.sum_val(`data_0`);

        const desc_leveling = () => {
          for (let i = 0;i < 10;i++) {
            i != 9　? tpl.push(`${i + 1}回`)　: tpl.push(`10回~`);

            (() => {
              let result = objs.filter(({data_3}) => data_3 >= (i+2));
              data_20_arr.push(result.length);
              let rate = (result.length).to_perate(objs.length);
              let arate =  rate.to_perate(data_00_arr[i]);
              data_00_arr.push(rate);
              data_01_arr.push(arate);
            })();

            let result = i != 9 ? objs.filter(({data_3}) => data_3 == (i + 1)) : objs.filter(({data_3}) => data_3 >= 10);

            let data_0 = result.sum_val(`data_0`);
            let data_3 = result.sum_val(`data_3`);
            let cup = data_0.to_devide(data_3);

            data_10_arr.push(data_0);
            data_11_arr.push(cup);
            data_21_arr.push(result.length);

            if (cpt) {
              (() => {
                let c_result = c_objs.filter(({data_3}) => data_3 >= (i+2));
                c_data_20_arr.push(c_result.length);
                let c_rate = (c_result.length).to_perate(c_objs.length);
                let c_arate =  c_rate.to_perate(data_00_arr[i]);
                c_data_00_arr.push(c_rate);
                c_data_01_arr.push(c_arate);
              })();

              let c_result = i != 9 ? c_objs.filter(({data_3}) => data_3 == (i + 1)) : c_objs.filter(({data_3}) => data_3 >= 10);

              let c_data_0 = c_result.sum_val(`data_0`);
              let c_data_3 = c_result.sum_val(`data_3`);
              let c_cup = c_data_0.to_devide(c_data_3);

              c_data_10_arr.push(c_data_0);
              c_data_11_arr.push(c_cup);
              c_data_21_arr.push(c_result.length);
            }
          }
        }
        const desc_continue_line = () => {
          let f_color = !cpt ? `rgba(242,100,100,1)` : `rgba(54,100,180,.5)`;
          let graph_data = [{
            type:"LineWithLine",
            label:"初回からの継続率",
            data:data_00_arr,
            backgroundColor:`#fff`,
            borderColor:`rgba(54,100,180,1)`,
            borderWidth:1.5,
            fill:false,
            yAxisID: "y-axis-0",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          },{
            type:"LineWithLine",
            label:"前回からの継続率",
            data:data_01_arr,
            backgroundColor:`#fff`,
            borderColor:f_color,
            borderWidth:1.5,
            fill:false,
            yAxisID: "y-axis-0",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          }];
          if (cpt) {
            graph_data.push({
              type:"LineWithLine",
              label:"初回からの継続率(比)",
              data:c_data_00_arr,
              backgroundColor:`#fff`,
              borderColor:`rgba(242,100,100,1)`,
              borderWidth:1.5,
              fill:false,
              yAxisID: "y-axis-0",
              cubicInterpolationMode: 'monotone',
              lineTension: 0
            },{
              type:"LineWithLine",
              label:"前回からの継続率(比)",
              data:c_data_01_arr,
              backgroundColor:`#fff`,
              borderColor:`rgba(242,100,100,.5)`,
              borderWidth:1.5,
              fill:false,
              yAxisID: "y-axis-0",
              cubicInterpolationMode: 'monotone',
              lineTension: 0
            });
          }
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{labels:{fontSize:10,boxWidth:24}},
            title: {display:false,fontSize:12,text:"",},
            elements: {point:{radius:4}},
            scales: {
              yAxes: [{
                id: "y-axis-0",
                type: "linear",
                position: "left",
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  min:0,
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:4,
                  callback: function(label, index, labels) {
                    return `${label}%`;
                  }
                },
              }],
              xAxes: [{
                barPercentage: .9,
                categoryPercentage:1,
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  min:0,
                  fontSize:8,
                  autoSkip: true,
                  maxTicksLimit:8,
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                }
              }]
            },
            tooltips: {
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              intersect:false,
              axis:'x',
              mode:'index',
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  if (index != 9) return `${index+1}回`;
                  else return `10回~`;
                },
                label:function(t,d) {
                  let index = t.index;
                  let idx = t.datasetIndex;
                  let amount = t.yLabel;
                  let ar = ["初回継続率","前回継","初回継(比)","前回継(比)"];
                  return `${ar[idx]} ${amount}%`;
                }
              }
            }
          }
          continue_line.data = {
            labels:tpl,
            datasets:graph_data
          };
          continue_line.options = graph_option;
          continue_line.update();
        }
        const desc_money_line = () => {
          let f_color = !cpt ? `rgba(255,200,0` : `rgba(54,100,180`;
          let graph_data = [{
            type:"LineWithLine",
            label:"n回来院した顧客別総売客単価",
            data:data_11_arr,
            borderColor:`rgba(54,100,180,1)`,
            borderWidth:1.5,
            pointBackgroundColor:"#fff",
            fill:false,
            yAxisID: "y-axis-0",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          },{
            type:"bar",
            label:"n回来院 ~ 総売上",
            data:data_10_arr,
            backgroundColor:`${f_color},.05)`,
            borderColor:`${f_color},1)`,
            borderWidth:1,
            yAxisID: "y-axis-1",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          }];
          if (cpt) {
            graph_data.push({
              type:"LineWithLine",
              label:"n回来院 ~ 客単価",
              data:c_data_11_arr,
              borderColor:`rgba(242,100,100,1)`,
              pointBackgroundColor:"#fff",
              borderWidth:1.5,
              fill:false,
              yAxisID: "y-axis-0",
              cubicInterpolationMode: 'monotone',
              lineTension: 0
            },{
              type:"bar",
              label:"n回来院 ~ 総売上",
              data:c_data_10_arr,
              backgroundColor:`rgba(242,100,100,.05)`,
              borderColor:`rgba(242,100,100,1)`,
              borderWidth:1,
              yAxisID: "y-axis-1",
              cubicInterpolationMode: 'monotone',
              lineTension: 0
            });
          }
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{labels:{fontSize:10,boxWidth:24}},
            title: {display:false,fontSize:12,text:"",},
            elements: {point:{radius:4}},
            scales: {
              yAxes: [{
                id: "y-axis-0",
                type: "linear",
                position: "left",
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  min:0,
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:4,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              },{
                id: "y-axis-1",
                type: "linear",
                position: "right",
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                ticks: {
                  min:0,
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:4,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              }],
              xAxes: [{
                barPercentage: .9,
                categoryPercentage:.9,
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  min:0,
                  fontSize:8,
                  autoSkip: true,
                  maxTicksLimit:8,
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                }
              }]
            },
            tooltips: {
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              intersect:false,
              axis:'x',
              mode:'index',
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  if (index != 9) return `${index+1}回`;
                  else return `10回~`;
                },
                label:function(t,d) {
                  let index = t.index;
                  let idx = t.datasetIndex;
                  let amount = t.yLabel;
                  let ar = ["客単価","合計","客単価(比)","合計(比)"];
                  return `${ar[idx]} ${amount.toLocaleString()}円`;
                }
              }
            }
          }
          money_line.data = {
            labels:tpl,
            datasets:graph_data
          };
          money_line.options = graph_option;
          money_line.update();
        }
        const desc_table = () => {
          let ap = ``;

          (() => {
            let app = ``;
            for (let i = 0;i < 10;i++) {
              let data = data_20_arr[i];
              if (!cpt) {
                app += `<td>${data.toLocaleString()}</td>`;
              } else {
                let c_data = c_data_20_arr[i];
                let rate = data.to_rate(c_data).rate_str();
                app +=
                `
                <td>
                  ${data.toLocaleString()}
                  <div class="c_a">${c_data.toLocaleString()}</div>
                  ${rate}
                </td>
                `;
              }
            }
            ap += `<tr><th>総人数</th>${app}</tr>`;
          })();
          (() => {
            let app = ``;
            for (let i = 0;i < 10;i++) {
              let data = data_20_arr[i+1];
              if (!cpt) {
                app += `<td>${data}</td>`;
              } else {
                let c_data = c_data_20_arr[i+1];
                let rate = data.to_rate(c_data).rate_str();
                app +=
                `
                <td>
                  ${data.toLocaleString()}
                  <div class="c_a">${c_data.toLocaleString()}</div>
                  ${rate}
                </td>
                `;
              }
            }
            ap += `<tr><th>継続数</th>${app.toLocaleString()}</tr>`;
          })();
          (() => {
            let app = ``;
            for (let i = 0;i < 10;i++) {
              let data = data_21_arr[i];
              if (!cpt) {
                app += `<td>${data}</td>`;
              } else {
                let c_data = c_data_21_arr[i];
                let rate = data.to_rate(c_data).rate_con_str();
                app +=
                `
                <td>
                  ${data.toLocaleString()}
                  <div class="c_a">${c_data.toLocaleString()}</div>
                  ${rate}
                </td>
                `;
              }
            }
            ap += `<tr><th>離脱数</th>${app.toLocaleString()}</tr>`;
          })();
          (() => {
            ap += `<tr><th class="th_long" colspan="11"></th></tr>`;
          })();
          (() => {
            let app = ``;
            for (let i = 0;i < 10;i++) {
              let data = data_00_arr[i];
              if (!cpt) {
                app += `<td>${data}%</td>`;
              } else {
                let c_data = c_data_00_arr[i];
                let rate = data.to_rate(c_data).rate_str();
                app +=
                `
                <td>
                  ${data.toLocaleString()}%
                  <div class="c_a">${c_data.toLocaleString()}%</div>
                  ${rate}
                </td>
                `;
              }
            }
            ap += `<tr><th>初回継続率</th>${app}</tr>`;
          })();
          (() => {
            let app = ``;
            for (let i = 0;i < 10;i++) {
              if (i == 0) {
                app += `<th></th>`;
              } else {
                let data = data_01_arr[i];
                if (!cpt) {
                  app += `<td>${data}%</td>`;
                } else {
                  let c_data = c_data_01_arr[i];
                  let rate = data.to_rate(c_data).rate_str();
                  app +=
                  `
                  <td>
                    ${data.toLocaleString()}%
                    <div class="c_a">${c_data.toLocaleString()}%</div>
                    ${rate}
                  </td>
                  `;
                }
              }
            }
            ap += `<tr><th>前回継続率</th>${app}</tr>`;
          })();
          (() => {
            ap += `<tr><th class="th_long" colspan="11"></th></tr>`;
          })();
          (() => {
            let app = ``;
            for (let i = 0;i < 10;i++) {
              let data = data_10_arr[i];
              if (!cpt) {
                app += `<td>${data.str_jp()}</td>`;
              } else {
                let c_data = c_data_10_arr[i];
                let rate = data.to_rate(c_data).rate_str();
                app +=
                `
                <td>
                  ${data.str_jp()}
                  <div class="c_a">${c_data.str_jp()}</div>
                  ${rate}
                </td>
                `;
              }
            }
            ap += `<tr><th>総売</th>${app}</tr>`;
          })();
          (() => {
            let app = ``;
            for (let i = 0;i < 10;i++) {
              let data = data_11_arr[i];
              if (!cpt) {
                app += `<td>${data.toLocaleString()}</td>`;
              } else {
                let c_data = c_data_11_arr[i];
                let rate = data.to_rate(c_data).rate_str();
                app +=
                `
                <td>
                  ${data.str_jp()}
                  <div class="c_a">${c_data.str_jp()}</div>
                  ${rate}
                </td>
                `;
              }
            }
            ap += `<tr><th>客単価</th>${app}</tr>`;
          })();

          $('#continue_table_base').html(
            `
            <table id="continue_table">
              <thead>
                <tr>
                  <th>-</th>
                  <th>1回</th>
                  <th>2回</th>
                  <th>3回</th>
                  <th>4回</th>
                  <th>5回</th>
                  <th>6回</th>
                  <th>7回</th>
                  <th>8回</th>
                  <th>9回</th>
                  <th>10回~</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
            </table>
            `
          );
        }

        desc_leveling();
        desc_continue_line();
        desc_money_line();
        desc_table();
      }
      const desc_segment_section = () => {
        const desc_cell = () => {
          let ap = ``;
          for (let i = 0;i < 10;i++) {
            let result = objs.filter(({data_3}) => data_3 >= (i+1));
            let _recover = result.filter(({max_recover}) => max_recover == 1);
            let _remove = result.filter((cell) => cell.max_recover == 0 && cell.data_3 == (i+1));
            let _continue = result.length - _recover.length - _remove.length;

            let rate_0 = _continue.to_perate(result.length);
            let rate_1 = (_recover.length).to_perate(result.length);
            let rate_2 = (_remove.length).to_perate(result.length);

            ap +=
            `
            <input type="radio" name="repeat_segment_" id="repeat_segment_${i}">
            <label for="repeat_segment_${i}">
              <div class="num">${i+1}回</div>
              <div class="content">
                <div class="graph">
                  <div class="gb">
                    <div class="g inline" style="width:${rate_0}%;"></div>
                    <div class="g r inline" style="width:${rate_1}%;"></div>
                    <div class="g c inline" style="width:${rate_2}%;"></div>
                  </div>
                </div>
                <div class="indier">
                  <div class="row row_0"><i class="fas fa-stop"></i> ${_continue}人 <span>(${rate_0}%)</span></div>
                  <div class="row row_1"><i class="fas fa-stop"></i> ${_recover.length}人 <span>(${rate_1}%)</span></div>
                  <div class="row row_2"><i class="fas fa-stop"></i> ${_remove.length}人 <span>(${rate_2}%)</span></div>
                </div>
              </div>
              <div class="indi"><i class="fas fa-chevron-right"></i></div>
            </label>
            `;

          }

          $('#repeat_segment_base').html(ap);
        }
        const desc_segment = (rst) => {
          let result = objs.filter(({data_3}) => data_3 >= (rst+1));

          let co = Array.from(data.data.cl);
          let so = Array.from(data.data.sf);　

          let go = ["","男性","女性"];
          let ro = ["治療中","完治"];

          let tpl = [];
          for (let i = 0;i <= 100;i++) {tpl.push(`${i}歳`);}

          const desc_rstgb0 = () => {
            let _objs = result.filter(({data_3}) => data_3 > (rst+1));

            let data_0_arr = [];
            let data_1_arr = [];

            const desc_leveling = () => {
              let _males = _objs.filter(({gender}) => gender == 1);
              let _females = _objs.filter(({gender}) => gender == 2);

              for (let i = 0;i < 100;i++) {
                let _male = _males.filter(({age}) => age == i);
                let _female = _females.filter(({age}) => age == i);

                data_0_arr.push(_male.length);
                data_1_arr.push(_female.length * -1);
              }
            }
            const desc_bar = () => {
              let graph_data = [{
                type:"bar",
                label:"男性",
                data:data_0_arr,
                backgroundColor:`rgba(54,100,180,1)`,
                borderColor:`rgba(54,100,180,1)`,
                yAxisID: "y-axis-0",
                cubicInterpolationMode: 'monotone',
                lineTension: 0
              },{
                type:"bar",
                label:"女性",
                data:data_1_arr,
                backgroundColor:`rgb(242,100,100)`,
                borderColor:`rgb(242,100,100)`,
                yAxisID: "y-axis-0",
                cubicInterpolationMode: 'monotone',
                lineTension : 0
              }];
              let graph_option = {
                maintainAspectRatio:true,
                responsive: true,
                legend:{
                  labels:{
                    fontSize:10,
                    boxWidth:24
                  }
                },
                title: {display:false,fontSize:12,text:"",},
                elements: {
                  point:{radius:0}
                },
                scales: {
                  yAxes: [{
                    id: "y-axis-0",
                    type: "linear",
                    position: "left",
                    gridLines: {
                      display:true,
                      drawBorder: false,
                      zeroLineColor:"#eee",
                      color:"#eee"
                    },
                    ticks: {
                      autoSkip: true,
                      fontSize:8,
                      maxTicksLimit:4,
                      callback: function(label, index, labels) {
                        if (label < 0) return `${(label * -1).str_jp()}`;
                        else return label.str_jp();
                      }
                    },
                  }],
                  xAxes: [{
                    barPercentage:1,
                    categoryPercentage:1,
                    stacked:true,
                    ticks: {
                      maxRotation: 0,
                      minRotation: 0,
                      fontSize:8,
                      autoSkip: true,
                      maxTicksLimit:8,
                    },
                    gridLines: {
                      display:false,
                      drawBorder: false,
                    },
                    scaleLabel: {
                      display: false,
                    }
                  }]
                },
                tooltips: {
                  bodySpacing:5,
                  titleFontSize:12.5,
                  bodyFontSize:15,
                  intersect:false,
                  axis:'x',
                  mode:'index',
                  callbacks: {
                    title:function(t,d) {
                      let index = t[0].index;
                      return `${index}歳`;
                    },
                    label:function(t,d) {
                      let index = t.index;
                      let idx = t.datasetIndex;
                      let amount = t.yLabel;
                      amount = amount < 0 ? amount * -1 : amount;
                      let ar = ["男性","女性"];
                      return `${ar[idx]} ${amount.str_jp()}人`;
                    }
                  }
                }
              }
              rstgb0.data = {
                labels:tpl,
                datasets:graph_data
              };
              rstgb0.options = graph_option;
              rstgb0.update();
            }

            desc_leveling();
            desc_bar();
            $(document).off('click','#rstbtn0').on('click','#rstbtn0',function() {
              download_excel(0,_objs);
            });
          }
          const desc_rstgb1 = () => {
            let _objs = result.filter(({data_3}) => data_3 == (rst+1));

            let data_0_arr = [];
            let data_1_arr = [];

            const desc_leveling = () => {
              let _males = _objs.filter(({gender}) => gender == 1);
              let _females = _objs.filter(({gender}) => gender == 2);

              for (let i = 0;i < 100;i++) {
                let _male = _males.filter(({age}) => age == i);
                let _female = _females.filter(({age}) => age == i);

                data_0_arr.push(_male.length);
                data_1_arr.push(_female.length * -1);
              }
            }
            const desc_bar = () => {
              let graph_data = [{
                type:"bar",
                label:"男性",
                data:data_0_arr,
                backgroundColor:`rgba(54,100,180,1)`,
                borderColor:`rgba(54,100,180,1)`,
                yAxisID: "y-axis-0",
                cubicInterpolationMode: 'monotone',
                lineTension: 0
              },{
                type:"bar",
                label:"女性",
                data:data_1_arr,
                backgroundColor:`rgb(242,100,100)`,
                borderColor:`rgb(242,100,100)`,
                yAxisID: "y-axis-0",
                cubicInterpolationMode: 'monotone',
                lineTension : 0
              }];
              let graph_option = {
                maintainAspectRatio:true,
                responsive: true,
                legend:{
                  labels:{
                    fontSize:10,
                    boxWidth:24
                  }
                },
                title: {display:false,fontSize:12,text:"",},
                elements: {
                  point:{radius:0}
                },
                scales: {
                  yAxes: [{
                    id: "y-axis-0",
                    type: "linear",
                    position: "left",
                    gridLines: {
                      display:true,
                      drawBorder: false,
                      zeroLineColor:"#eee",
                      color:"#eee"
                    },
                    ticks: {
                      autoSkip: true,
                      fontSize:8,
                      maxTicksLimit:4,
                      callback: function(label, index, labels) {
                        if (label < 0) return `${(label * -1).str_jp()}`;
                        else return label.str_jp();
                      }
                    },
                  }],
                  xAxes: [{
                    barPercentage:1,
                    categoryPercentage:1,
                    stacked:true,
                    ticks: {
                      maxRotation: 0,
                      minRotation: 0,
                      fontSize:8,
                      autoSkip: true,
                      maxTicksLimit:8,
                    },
                    gridLines: {
                      display:false,
                      drawBorder: false,
                    },
                    scaleLabel: {
                      display: false,
                    }
                  }]
                },
                tooltips: {
                  bodySpacing:5,
                  titleFontSize:12.5,
                  bodyFontSize:15,
                  intersect:false,
                  axis:'x',
                  mode:'index',
                  callbacks: {
                    title:function(t,d) {
                      let index = t[0].index;
                      return `${index}歳`;
                    },
                    label:function(t,d) {
                      let index = t.index;
                      let idx = t.datasetIndex;
                      let amount = t.yLabel;
                      amount = amount < 0 ? amount * -1 : amount;
                      let ar = ["男性","女性"];
                      return `${ar[idx]} ${amount.str_jp()}人`;
                    }
                  }
                }
              }
              rstgb1.data = {
                labels:tpl,
                datasets:graph_data
              };
              rstgb1.options = graph_option;
              rstgb1.update();
            }

            desc_leveling();
            desc_bar();
            $(document).off('click','#rstbtn1').on('click','#rstbtn1',function() {
              download_excel(1,_objs);
            });
          }

          const download_excel = (type,cuso) => {
            if (cuso.length == 0) {alert('該当する顧客がいません。');return;}

            let today = new Date();
            let ta = ["継続","離脱"];
            let ap = ``;

            cuso.forEach((cell) => {
              let clinic = co.filter(({obj_id}) => obj_id == cell.clinic_id)[0];

              ap +=
              `
              <tr>
                <th>${user_name==MSD_smn?`患者${cell.c_ptno}`:cell.c_name}</th>
                <th>${user_name==MSD_smn?`カンジャ${cell.c_ptno}`:cell.c_kana}</th>
                <th>${cell.tel}</th>
                <th>${cell.mobile}</th>
                <th>${cell.postcd}</th>
                <th>${cell.addr1}</th>
                <th>${cell.addr2}</th>
                <th>${cell.email}</th>
                <th>${clinic.obj_name}</th>
                <th>${cell.staff_name}</th>
                <th>${cell.age}</th>
                <th>${go[cell.gender]}</th>
                <th>${ro[cell.max_recover]}</th>
                <th>${cell.data_0}</th>
                <th>${cell.data_1}</th>
                <th>${cell.data_2}</th>
                <th>${cell.data_3}</th>
              </tr>
              `;
            });

            $('#download_table_base').html(
              `
              <tr>
                <th>名前</th>
                <th>かな</th>
                <th>電話番号</th>
                <th>携帯電話</th>
                <th>郵便番号</th>
                <th>住所1</th>
                <th>住所2</th>
                <th>eメール</th>
                <th>院</th>
                <th>初回担当者</th>
                <th>年齢</th>
                <th>性別</th>
                <th>完治</th>
                <th>総売上</th>
                <th>窓口売上</th>
                <th>自費売上</th>
                <th>来院回数</th>
              </tr>
              ${ap}
              `
            );

            let wopts = {bookType: 'xlsx',bookSST: false,type: 'binary'};
            let workbook = {SheetNames: [],Sheets: {}};
            document.querySelectorAll('table.table_to_export').forEach(function (currentValue, index) {
              let n = currentValue.getAttribute('data-sheet-name');
              if (!n) n = 'Sheet' + index;
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
            }), `来院${rst+1}回目の${ta[type]}顧客一覧${ps.str_date(`-`)}~${pe.str_date(`-`)}.xlsx`);
          }
          desc_rstgb0();
          desc_rstgb1();
        }

        desc_cell();
        $(document).off('clicl','input[name="repeat_segment_"]').on('click','input[name="repeat_segment_"]',function() {
          let index = $('input[name="repeat_segment_"]').index(this);
          desc_segment(index);
        });
        desc_segment(0);
        $(`#repeat_segment_0`).prop('checked',true);

      }
      const desc_geneder_section = () => {
        let ap = ``;

        let sum_data_0 = objs.length;
        let sum_c_data_0 = c_objs.length;

        gro.forEach((cell) => {
          let result = objs.filter(({geneder_id}) => geneder_id == cell.id);
          let data_0 = result.length;
          let data_1 = result.sum_val(`data_3`);
          let data_2 = data_1.to_Perate(data_0);

          let rate_0 = data_0.to_perate(sum_data_0);

          if (!cpt) {
            ap +=
            `
            <tr>
              <th>${cell.name}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
              </td>
              <td>${data_2.str_jp()}</td>
            </tr>
            `;
          } else {
            let c_result = c_objs.filter(({visit_reason_id}) => visit_reason_id == cell.id);
            let c_data_0 = c_result.length;
            let c_data_1 = c_result.sum_val(`data_3`);
            let c_data_2 = c_data_1.to_Perate(c_data_0);

            let c_rate_0 = c_data_0.to_perate(sum_c_data_0);

            let rates_0 = data_0.to_rate(c_data_0).rate_str();
            let rates_2 = data_2.to_rate(c_data_2).rate_str();

            ap +=
            `
            <tr>
              <th>${cell.name}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
                <div class="c_a">
                  ${c_data_0.str_jp()}
                  <span>(${c_rate_0}%)</span>
                  <div class="bb cb" style="width:${c_rate_0}%;"></div>
                </div>
                ${rates_0}
              </td>
              <td>
                ${data_2.str_jp()}
                <div class="c_a">
                  ${c_data_2.str_jp()}
                </div>
                ${rates_2}
              </td>
            </tr>
            `;
          }
        });

        $('#geneder_table_base').html(
          `
          <table id="geneder_table">
            <thead>
              <tr>
                <th>-</th>
                <th>該当数</th>
                <th>平均来院数</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );

        let table = $('#geneder_table').DataTable({
          columnDefs:[{type:'currency',targets:[1,2]}],
          displayLength:10,
          lengthChange: false,
          searching: false,
          ordering: true,
          info: true,
          paging: true,
          order:[[1,"desc"]]
        });
      }
      const desc_clinic_section = () => {
        if (st != 0) return;
        let ap = ``;
        let co = data.data.cl;

        let sum_data_0 = objs.length;
        let sum_c_data_0 = c_objs.length;

        co.forEach((cell) => {
          let result = objs.filter(({clinic_id}) => clinic_id == cell.obj_id);
          let data_0 = result.length;
          let data_1 = result.sum_val(`data_3`);
          let data_2 = data_1.to_Perate(data_0);

          let rate_0 = data_0.to_perate(sum_data_0);

          let link =
          `
          <a href="/achieve_analytics?st=1&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
            ${user_name==MSD_smn?`${stna[1]}${cell.obj_id}`: cell.obj_name}
          </a>
          `;

          if (!cpt) {
            ap +=
            `
            <tr>
              <th>${link}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
              </td>
              <td>${data_2.str_jp()}</td>
            </tr>
            `;
          } else {
            let c_result = c_objs.filter(({clinic_id}) => clinic_id == cell.obj_id);
            let c_data_0 = c_result.length;
            let c_data_1 = c_result.sum_val(`data_3`);
            let c_data_2 = c_data_1.to_Perate(c_data_0);

            let c_rate_0 = c_data_0.to_perate(sum_c_data_0);

            let rates_0 = data_0.to_rate(c_data_0).rate_str();
            let rates_2 = data_2.to_rate(c_data_2).rate_str();

            ap +=
            `
            <tr>
              <th>${link}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
                <div class="c_a">
                  ${c_data_0.str_jp()}
                  <span>(${c_rate_0}%)</span>
                  <div class="bb cb" style="width:${c_rate_0}%;"></div>
                </div>
                ${rates_0}
              </td>
              <td>
                ${data_2.str_jp()}
                <div class="c_a">
                  ${c_data_2.str_jp()}
                </div>
                ${rates_2}
              </td>
            </tr>
            `;
          }
        });
        $('#clinic_table_base').html(
          `
          <table id="clinic_table">
            <thead>
              <tr>
                <th>-</th>
                <th>該当数</th>
                <th>平均来院数</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );
        let table = $('#clinic_table').DataTable({
          columnDefs:[{type:'currency',targets:[1]}],
          displayLength:10,
          lengthChange: false,
          searching: false,
          ordering: true,
          info: true,
          paging: true,
          order:[[1,"desc"]]
        });
      }
      const desc_staff_section = () => {
        if (st == 2) return;
        let ap = ``;
        let so = data.data.sf;

        let sum_data_0 = objs.length;
        let sum_c_data_0 = c_objs.length;

        so.forEach((cell) => {
          let result = objs.filter(({staff_id}) => staff_id == cell.obj_id);
          let data_0 = result.length;
          let data_1 = result.sum_val(`data_3`);
          let data_2 = data_1.to_Perate(data_0);

          let rate_0 = data_0.to_perate(sum_data_0);

          let link = ``;
          if (cls.filter(({id}) => id == cell.clinic_id).exist_val()) {
            link =
            `
            <a href="/achieve_analytics?st=2&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
              ${user_name==MSD_smn?`${stna[2]}${cell.obj_id}`: cell.obj_name}
            </a>
            `;
          } else {
            link = `${user_name==MSD_smn?`${stna[2]}${cell.obj_id}`: cell.obj_name}`;
          }

          if (!cpt) {
            ap +=
            `
            <tr>
              <th>${link}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
              </td>
              <td>${data_2.str_jp()}</td>
            </tr>
            `;
          } else {
            let c_result = c_objs.filter(({staff_id}) => staff_id == cell.obj_id);
            let c_data_0 = c_result.length;
            let c_data_1 = c_result.sum_val(`data_3`);
            let c_data_2 = c_data_1.to_Perate(c_data_0);

            let c_rate_0 = c_data_0.to_perate(sum_c_data_0);

            let rates_0 = data_0.to_rate(c_data_0).rate_str();
            let rates_2 = data_2.to_rate(c_data_2).rate_str();

            ap +=
            `
            <tr>
              <th>${link}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
                <div class="c_a">
                  ${c_data_0.str_jp()}
                  <span>(${c_rate_0}%)</span>
                  <div class="bb cb" style="width:${c_rate_0}%;"></div>
                </div>
                ${rates_0}
              </td>
              <td>
                ${data_2.str_jp()}
                <div class="c_a">
                  ${c_data_2.str_jp()}
                </div>
                ${rates_2}
              </td>
            </tr>
            `;
          }
        });

        $('#staff_table_base').html(
          `
          <table id="staff_table">
            <thead>
              <tr>
                <th>-</th>
                <th>該当数</th>
                <th>平均来院数</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );
        let table = $('#staff_table').DataTable({
          columnDefs:[{type:'currency',targets:[1,2]}],
          displayLength:10,
          lengthChange: false,
          searching: false,
          ordering: true,
          info: true,
          paging: true,
          order:[[1,"desc"]]
        });
      }
      const desc_visit_reason_section = () => {
        let ap = ``;

        let vro = Array.from(data.data.vr);
        vro.push({obj_id:0,obj_name:"無回答"});

        let sum_data_0 = objs.length;
        let sum_c_data_0 = c_objs.length;

        vro.forEach((cell) => {
          let result = objs.filter(({visit_reason_id}) => visit_reason_id == cell.obj_id);
          let data_0 = result.length;
          let data_1 = result.sum_val(`data_3`);
          let data_2 = data_1.to_Perate(data_0);

          let rate_0 = data_0.to_perate(sum_data_0);

          if (!cpt) {
            ap +=
            `
            <tr>
              <th>${cell.obj_name}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
              </td>
              <td>${data_2.str_jp()}</td>
            </tr>
            `;
          } else {
            let c_result = c_objs.filter(({visit_reason_id}) => visit_reason_id == cell.obj_id);
            let c_data_0 = c_result.length;
            let c_data_1 = c_result.sum_val(`data_3`);
            let c_data_2 = c_data_1.to_Perate(c_data_0);

            let c_rate_0 = c_data_0.to_perate(sum_c_data_0);

            let rates_0 = data_0.to_rate(c_data_0).rate_str();
            let rates_2 = data_2.to_rate(c_data_2).rate_str();

            ap +=
            `
            <tr>
              <th>${cell.obj_name}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
                <div class="c_a">
                  ${c_data_0.str_jp()}
                  <span>(${c_rate_0}%)</span>
                  <div class="bb cb" style="width:${c_rate_0}%;"></div>
                </div>
                ${rates_0}
              </td>
              <td>
                ${data_2.str_jp()}
                <div class="c_a">
                  ${c_data_2.str_jp()}
                </div>
                ${rates_2}
              </td>
            </tr>
            `;
          }
        });

        $('#visit_reason_table_base').html(
          `
          <table id="visit_reason_table">
            <thead>
              <tr>
                <th>-</th>
                <th>該当数</th>
                <th>平均来院数</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );

        let table = $('#visit_reason_table').DataTable({
          columnDefs:[{type:'currency',targets:[1,2]}],
          displayLength:10,
          lengthChange: false,
          searching: false,
          ordering: true,
          info: true,
          paging: true,
          order:[[1,"desc"]]
        });
      }
      const desc_map_section = () => {
        $('input[name="map_customer_"]').prop('checked',true);
        let co = data.data.cl;
        let cuo = objs;

        let clinic_filter_arr = [];
        let clinic_arr = [];
        let user_arr = [];

        for (let i = 0;i < co.length;i=(i+1)|0) {
          let cell = co[i];
          let LatLng = {
            id:cell.obj_id,
            name:cell.obj_name,
            lat:cell.lat,
            lng:cell.lng
          }
          clinic_arr.push(LatLng);
        }
        for (let i = 0;i < cuo.length;i=(i+1)|0) {
          let cell = cuo[i];
          if (cell.lng == null || cell.lat == null) {
            continue;
          }
          let LatLng = {
            lat:cell.lat,
            lng:cell.lng,
            name:`${user_name==MSD_smn?`患者${cell.c_ptno}`:cell.c_name}`,
            geneder:gro[cell.geneder_id].name,
            staff_id:cell.staff_id,
            clinic_id:cell.clinic_id,
            addr1:cell.addr1,
            addr2:cell.addr2,
            data_0:cell.data_0,
            data_1:cell.data_1,
            data_2:cell.data_2,
            data_3:cell.data_3
          };
          user_arr.push(LatLng);
        }

        let map;
        let bounds = new google.maps.LatLngBounds();
        let clinic_marker = [];
        let circle_arr = [];
        let user_marker = [];
        let user_0_arr = [],user_0_ar = [];
        let user_1_arr = [],user_1_ar = [];
        let user_2_arr = [],user_2_ar = [];
        let clinic_infoWindow = [];
        let user_infoWindow = [];
        let marker_group_0;
        let marker_group_1;
        let marker_group_2;

        const desc_clear_close = (callback) => {
          for (let idx = 0;idx < clinic_infoWindow.length;idx++) {
            clinic_infoWindow[idx].close();
          }
          for (let idx = 0;idx < user_infoWindow.length;idx++) {
            user_infoWindow[idx].close();
          }
          callback();
        }

        const desc_map = () => {
          let mapLatLng = new google.maps.LatLng({lat: clinic_arr[0].lat, lng: clinic_arr[0].lng});
          map = new google.maps.Map(document.getElementById('canvas_map'),{
            center: mapLatLng,
            zoom: 13,
            mapTypeControl: false,
            streetViewControl: false,
            styles: [
              {"elementType": "geometry","stylers": [{"color": "#212121"}]},
              {"elementType": "labels.icon","stylers": [{"visibility": "off"}]},
              {"elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
              {"elementType": "labels.text.stroke","stylers": [{"color": "#212121"}]},
              {"featureType": "administrative","elementType": "geometry","stylers": [{"color": "#757575"}]},
              {"featureType": "administrative.country","elementType": "labels.text.fill","stylers": [{"color": "#9e9e9e"}]},
              {"featureType": "administrative.land_parcel","stylers": [{"visibility": "off"}]},
              {"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#bdbdbd"}]},
              {"featureType": "administrative.neighborhood","stylers": [{"visibility": "off"}]},
              {"featureType": "poi","elementType": "labels.text","stylers": [{"visibility": "off"}]},
              {"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
              {"featureType": "poi.business","stylers": [{"visibility": "off"}]},
              {"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#181818"}]},
              {"featureType": "poi.park","elementType": "labels.text","stylers": [{"visibility": "off"}]},
              {"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#616161"}]},
              {"featureType": "poi.park","elementType": "labels.text.stroke","stylers": [{"color": "#1b1b1b"}]},
              {"featureType": "road","elementType": "geometry.fill","stylers": [{"color": "#2c2c2c"}]},
              {"featureType": "road","elementType": "labels","stylers": [{"visibility": "off"}]},
              {"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#8a8a8a"}]},
              {"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#373737"}]},
              {"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#3c3c3c"}]},
              {"featureType": "road.highway.controlled_access","elementType": "geometry","stylers": [{"color": "#4e4e4e"}]},
              {"featureType": "road.local","elementType": "labels.text.fill","stylers": [{"color": "#616161"}]},
              {"featureType": "transit","elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
              {"featureType": "water","elementType": "geometry","stylers": [{"color": "#000000"}]},
              {"featureType": "water","elementType": "labels.text","stylers": [{"visibility": "off"}]},
              {"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#3d3d3d"}]}
            ]
          });

          let amount_total = cuo.length;
          let sum_data_0 = cuo.sum_val(`data_0`);
          let sum_data_1 = cuo.sum_val(`data_1`);
          let sum_data_2 = cuo.sum_val(`data_2`);
          let sum_data_3 = cuo.sum_val(`data_3`);

          for (let i = 0; i < clinic_arr.length; i++) {
            let result = cuo.filter(({clinic_id}) => clinic_id == clinic_arr[i].id);
            let data_0   =   result.sum_val(`data_0`);
            let data_1   =   result.sum_val(`data_1`);
            let data_2   =   result.sum_val(`data_2`);
            let data_3   =   result.sum_val(`data_3`);

            let rate_amount  =      (result.length).to_perate(amount_total);
            let rate_0       =      data_0.to_perate(sum_data_0);
            let rate_1       =      data_1.to_perate(sum_data_1);
            let rate_2       =      data_2.to_perate(sum_data_2);
            let rate_3       =      data_3.to_perate(sum_data_3);

            markerLatLng = new google.maps.LatLng({lat: clinic_arr[i].lat, lng: clinic_arr[i].lng});
            clinic_marker[i] = new google.maps.Marker({
              position: markerLatLng,
              map: map,
              icon:"https://img.icons8.com/color/30/000000/hospital.png",
            });
            bounds.extend(clinic_marker[i].position);

            circle_arr[i] = new google.maps.Circle({
              strokeColor: 'rgba(66,133,244,1)',
              strokeOpacity:1,
              strokeWeight: 1,
              fillColor: 'rgba(66,133,244,1)',
              fillOpacity: .1,
              map: map,
              center: markerLatLng,
              radius: 3000
            });

            clinic_infoWindow[i] = new google.maps.InfoWindow({
              content:
                `
                <div style="text-align:left;font-size:1rem;">
                  ${clinic_arr[i].name}
                </div>
                純患数 : ${result.length}人(${rate_amount}%)
                <div style="height:4px;background-color:#ddd;">
                  <div style="width:${rate_amount}%;height:4px;background-color:rgba(69,165,255,1);"></div>
                </div>
                総売上 : ¥${data_0.str_jp()}(${rate_0}%)
                <div style="height:4px;background-color:#ddd;">
                  <div style="width:${rate_0}%;height:4px;background-color:rgba(69,165,255,1);"></div>
                </div>
                窓口売上 : ¥${data_1.str_jp()}(${rate_1}%)
                <div style="height:4px;background-color:#ddd;">
                  <div style="width:${rate_1}%;height:4px;background-color:rgba(69,165,255,1);"></div>
                </div>
                自費売上 : ¥${data_2.str_jp()}(${rate_2}%)
                <div style="height:4px;background-color:#ddd;">
                  <div style="width:${rate_2}%;height:4px;background-color:rgba(69,165,255,1);"></div>
                </div>
                総来院数 : ${data_3.str_jp()}(${rate_3}%)
                <div style="height:4px;background-color:#ddd;">
                  <div style="width:${rate_3}%;height:4px;background-color:rgba(69,165,255,1);"></div>
                </div>
                <br>
                <div class="info_link" name="clinic_map_" id="clinic_map_${clinic_arr[i].id}">${clinic_arr[i].name}の顧客</div>
                `
            });
            clinic_event(i);
          }
          if (clinic_marker.length >= 2) {
            map.fitBounds(bounds);
          }

          for (let i = 0;i < user_arr.length;i++) {
            markerLatLng = new google.maps.LatLng({lat: user_arr[i].lat, lng: user_arr[i].lng});

            let generation_arr = ["~12歳","~19歳","20代","30代","40代","50代","60代","70代","75歳~"];
            let gender_arr = ["","男性","女性"];
            let clinic_name = clinic_arr.filter(({id}) => id == user_arr[i].clinic_id)[0];
            user_infoWindow[i] = new google.maps.InfoWindow({
              content:
              `
                ${user_arr[i].name}
                <br>
                ${user_arr[i].addr1}
                <br>
                ${user_arr[i].addr2}
                <br>
                ${user_arr[i].geneder}
                <br>
                店舗:${clinic_name.name}
                <br>
                来院数:${user_arr[i].data_3.str_jp()}回
                <br>
                総売:${user_arr[i].data_0.str_jp()}円
                <br>
                窓口:${user_arr[i].data_1.str_jp()}円
                <br>
                自費:${user_arr[i].data_2.str_jp()}円
              `
            });

            let unm = 0;
            let num = 0;
            if (user_arr[i].data_3 == 1) {
              unm = 0;
              user_0_ar.push(user_arr[i]);
              user_0_arr.push(new google.maps.Marker({
                position: markerLatLng,
                map: map,
                icon:"/assets/man_10.png"
              }));
              num = user_0_arr.length - 1;

              user_0_arr[num].addListener('click', function() {
                desc_clear_close(() => {
                  user_infoWindow[i].open(map, user_0_arr[num]);
                });
              });
            } else if (user_arr[i].data_3 >= 2 && user_arr[i].data_3 <= 5) {
              unm = 1;
              user_1_ar.push(user_arr[i]);
              user_1_arr.push(new google.maps.Marker({
                position: markerLatLng,
                map: map,
                icon:"/assets/man_20.png"
              }));
              num = user_1_arr.length - 1;

              user_1_arr[num].addListener('click', function() {
                desc_clear_close(() => {
                  user_infoWindow[i].open(map, user_1_arr[num]);
                });
              });
            } else {
              unm = 2;
              user_2_ar.push(user_arr[i]);
              user_2_arr.push(new google.maps.Marker({
                position: markerLatLng,
                map: map,
                icon:"/assets/man_30.png"
              }));
              num = user_2_arr.length - 1;

              user_2_arr[num].addListener('click', function() {
                desc_clear_close(() => {
                  user_infoWindow[i].open(map, user_2_arr[num]);
                });
              });
            }
          }

          marker_group_0 = new MarkerClusterer(map, user_0_arr,{
            minimumClusterSize:100,
            styles:[
              {textColor: 'white',url: '/assets/group_0.png',height:52,width:53},
              {textColor: 'white',url: '/assets/group_0.png',height:52,width:53},
              {textColor: 'white',url: '/assets/group_0.png',height:52,width:53},
              {textColor: 'white',url: '/assets/group_0.png',height:52,width:53},
              {textColor: 'white',url: '/assets/group_0.png',height:52,width:53},
            ]
          });
          marker_group_1 = new MarkerClusterer(map, user_1_arr,{
            minimumClusterSize:100,
            styles:[
              {textColor: 'white',url: '/assets/group_1.png',height:55,width:56},
              {textColor: 'white',url: '/assets/group_1.png',height:55,width:56},
              {textColor: 'white',url: '/assets/group_1.png',height:55,width:56},
              {textColor: 'white',url: '/assets/group_1.png',height:55,width:56},
              {textColor: 'white',url: '/assets/group_1.png',height:55,width:56},
            ]
          });
          marker_group_2 = new MarkerClusterer(map, user_2_arr,{
            minimumClusterSize:100,
            styles:[
              {textColor: 'white',url: '/assets/group_2.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_2.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_2.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_2.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_2.png',height:65,width:66},
            ]
          });
        }
        const clinic_event = (i) => {
          clinic_marker[i].addListener('mouseover', function() {
            for (let i = 0;i < clinic_infoWindow.length;i++) {
              clinic_infoWindow[i].close();
            }
            for (let i = 0;i < user_infoWindow.length;i++) {
              user_infoWindow[i].close();
            }
            clinic_infoWindow[i].open(map, clinic_marker[i]);
          });
        }
        const redesc_filted_user = () => {
          user_0_arr.forEach((cell) => {cell.setVisible(false);});
          user_1_arr.forEach((cell) => {cell.setVisible(false);});
          user_2_arr.forEach((cell) => {cell.setVisible(false);});

          let bool_0 = $('#map_customer_0').prop('checked');
          let bool_1 = $('#map_customer_1').prop('checked');
          let bool_2 = $('#map_customer_2').prop('checked');

          let remark_0_arr = [];
          let remark_1_arr = [];
          let remark_2_arr = [];

          let sum = 0;
          let sum_0 = 0;
          let sum_1 = 0;
          let sum_2 = 0;

          if (clinic_filter_arr.length == 0) {
            $('#map_status .cell').remove();

            for (let i = 0;i < user_0_arr.length;i++) {
              if (bool_0) {
                user_0_arr[i].setVisible(bool_0);
                remark_0_arr.push(user_0_arr[i]);
                sum += 1;
                sum_0 += 1;
              }
            }
            for (let i = 0;i < user_1_arr.length;i++) {
              if (bool_1) {
                user_1_arr[i].setVisible(bool_1);
                remark_1_arr.push(user_1_arr[i]);
                sum += 1;
                sum_1 += 1;
              }
            }
            for (let i = 0;i < user_2_arr.length;i++) {
              if (bool_2) {
                user_2_arr[i].setVisible(bool_2);
                remark_2_arr.push(user_2_arr[i]);
                sum += 1;
                sum_2 += 1;
              }
            }

            $('#map_sum_base').text(`表示中の顧客:${sum}人 | ${clinic_arr.length}店舗`);
          } else {
            for (let i = 0;i < user_0_arr.length;i++) {
              if (clinic_filter_arr.indexOf(user_0_ar[i].clinic_id) != -1 && bool_0) {
                user_0_arr[i].setVisible(bool_0);
                remark_0_arr.push(user_0_arr[i]);
                sum += 1;
                sum_0 += 1;
              } else {
                user_0_arr[i].setVisible(false);
              }
            }
            for (let i = 0;i < user_1_arr.length;i++) {
              if (clinic_filter_arr.indexOf(user_1_ar[i].clinic_id) != -1 && bool_1) {
                user_1_arr[i].setVisible(bool_1);
                remark_1_arr.push(user_1_arr[i]);
                sum += 1;
                sum_1 += 1;
              } else {
                user_1_arr[i].setVisible(false);
              }
            }
            for (let i = 0;i < user_2_arr.length;i++) {
              if (clinic_filter_arr.indexOf(user_2_ar[i].clinic_id) != -1 && bool_2) {
                user_2_arr[i].setVisible(bool_2);
                remark_2_arr.push(user_2_arr[i]);
                sum += 1;
                sum_2 += 1;
              } else {
                user_2_arr[i].setVisible(false);
              }
            }
            $('#map_sum_base').text(`表示中の顧客:${sum}人 | ${clinic_filter_arr.length}店舗`);
          }

          $('#indi_sum_map_0').text(`${sum_0}人`);
          $('#indi_sum_map_1').text(`${sum_1}人`);
          $('#indi_sum_map_2').text(`${sum_2}人`);

          marker_group_0.clearMarkers();
          marker_group_1.clearMarkers();
          marker_group_2.clearMarkers();

          marker_group_0 = new MarkerClusterer(map, remark_0_arr,{
            minimumClusterSize:100,
            styles:[
              {textColor: 'white',url: '/assets/group_0.png',height:52,width:53},
              {textColor: 'white',url: '/assets/group_0.png',height:52,width:53},
              {textColor: 'white',url: '/assets/group_0.png',height:52,width:53},
              {textColor: 'white',url: '/assets/group_0.png',height:52,width:53},
              {textColor: 'white',url: '/assets/group_0.png',height:52,width:53},
            ]
          });
          marker_group_1 = new MarkerClusterer(map, remark_1_arr,{
            minimumClusterSize:100,
            styles:[
              {textColor: 'white',url: '/assets/group_1.png',height:55,width:56},
              {textColor: 'white',url: '/assets/group_1.png',height:55,width:56},
              {textColor: 'white',url: '/assets/group_1.png',height:55,width:56},
              {textColor: 'white',url: '/assets/group_1.png',height:55,width:56},
              {textColor: 'white',url: '/assets/group_1.png',height:55,width:56},
            ]
          });
          marker_group_2 = new MarkerClusterer(map, remark_2_arr,{
            minimumClusterSize:100,
            styles:[
              {textColor: 'white',url: '/assets/group_2.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_2.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_2.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_2.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_2.png',height:65,width:66},
            ]
          });
        }

        $(document).off('click','div[name="clinic_map_"]').on('click','div[name="clinic_map_"]',function() {
          let index = $(this).prop('id').split('_')[2];
          let clinic_cell = co.filter(({obj_id}) => obj_id == index)[0];
          if (clinic_filter_arr.indexOf(clinic_cell.obj_id) == -1) {
            clinic_filter_arr.push(Number(clinic_cell.obj_id));
            let name = clinic_cell.obj_name;
            $('#clinic_filter_base').append(
              `
              <div class="cel inline" id="clinic_cell_${clinic_cell.obj_id}">
                ${name}
                <div class="close inline" name="clinic_cell_close" id="clinic_cell_${clinic_cell.obj_id}"><i class="fas fa-times"></i></div>
              </div>
              `
            );
          }
          redesc_filted_user();
        });
        $(document).off('click','div[name="clinic_cell_close"]').on('click','div[name="clinic_cell_close"]',function() {
          let index = $(this).prop('id').split('_')[2];
          let idx = clinic_filter_arr.indexOf(Number(index));
          if (idx != -1) {
            $(`#clinic_cell_${index}`).remove();
            clinic_filter_arr.splice(idx,1);
            redesc_filted_user();
          }
        });
        $(document).off('click','input[name="map_customer_"]').on('click','input[name="map_customer_"]',function() {
          redesc_filted_user();
        });

        const desc_map_view = () => {
          desc_map();
          redesc_filted_user();
        }
        desc_map_view();
      }

      desc_trend_section();
      desc_segment_section();
      desc_geneder_section();
      desc_clinic_section();
      desc_staff_section();
      desc_visit_reason_section();

      $(document).off('click','#open_map').on('click','#open_map',function() {
        $('._map_ .cover').hide();
        desc_map_section();
      });
      $('._map_ .cover').show();
    }

    desc_content_leveling();
    const desc_graph_init = (sender1,sender2,sender3,sender4) => {
      eval(`try {${sender1}.destroy();} catch(err) {}`);
      eval(`${sender2}.canvas.height = 100;`);
      eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
    }

    let continue_line;
    let money_line;
    let rstgb0;
    let rstgb1;

    let continue_line_ctx = document.getElementById('continue_line').getContext('2d');
    desc_graph_init("continue_line","continue_line_ctx",'bar');
    let money_line_ctx = document.getElementById('money_line').getContext('2d');
    desc_graph_init("money_line","money_line_ctx",'bar');
    let rstgb0_ctx = document.getElementById('rstgb0').getContext('2d');
    desc_graph_init("rstgb0","rstgb0_ctx",'bar');
    let rstgb1_ctx = document.getElementById('rstgb1').getContext('2d');
    desc_graph_init("rstgb1","rstgb1_ctx",'bar');

    desc_cells_btn();
    desc_dynamic_sections(0);
    $(document).off('input','input[name="cell_input_"]').on('input','input[name="cell_input_"]',function() {
      let index = $('input[name="cell_input_"]').index(this);
      desc_dynamic_sections(Number(index));
    });
  } else if (bt == 6) {
    if (!data.data.data.exist_val()) {
      $('#content_base').html(`<div class="loading_base inline">データがありません。</div>`);
      return;
    }

    let datas = data.data.data;
    let c_datas = data.cdata.data;

    let cls = data.data.cls.data.split(',').map((label) => {return {id:Number(label)};});
    let oa = [datas,datas.filter(({min_rep}) => min_rep == 1),datas.filter(({min_rep}) => min_rep != 1)];
    let coa = [c_datas,c_datas.filter(({min_rep}) => min_rep == 1),c_datas.filter(({min_rep}) => min_rep != 1)];

    const desc_content_leveling = () => {
      let cl_s =
      st == 0
      ? `
      <div class="cell cell_1x1 inline">
        <div class="box cell_link">
          <div class="cell_title text_overflow">院別</div>
          <div class="content _repeat_">
            <div class="base">
              <div class="table_base table_base2" id="clinic_table_base">
              </div>
            </div>
          </div>
        </div>
      </div>`
      : ``;
      let sf_s =
      st != 2
      ? `
      <div class="cell cell_2x1 inline">
        <div class="box cell_link">
          <div class="cell_title cell_title_r text_overflow">
            最終担当者別・影響範囲・離脱割合・影響倍率
            <div class="icon inline">
              <i class="fas fa-question-circle help_tips" data-title="最終担当者が影響させているという確からしさの値" data-help="影響値とは、どの程度の効率で最終担当回数が算出されるかを表します。例えば、人気のスタッフは最終担当回数が必然的に多くなっていきますが、人気度の異なる他スタッフと比較するためには担当回数のみでは正確な値は出力できないので、影響の度合い多角度から計算します。"></i>
            </div>
            <div class="icon inline">
              <i class="fas fa-question-circle help_tips" data-title="影響範囲" data-help="影響範囲とは、全体の純患数に対する担当純患数の割合です。<br> 式<br>影響範囲R = 期間中担当純患数 % 全体の純患数"></i>
            </div>
            <div class="icon inline">
              <i class="fas fa-question-circle help_tips" data-title="離脱割合" data-help="離脱割合とは、総離脱数に対して実際にどの程度影響させたかを示す値です。 <br> 式<br>離脱割合I = 離脱確率M x 影響範囲R"></i>
            </div>
            <div class="icon inline">
              <i class="fas fa-question-circle help_tips" data-title="影響倍率" data-help="<br>式<br>影響倍率M = (最終担当回数 % 期間中担当純患数) % 全体の離脱率 <br>※1より高いほど平均よりも離脱させている"></i>
            </div>
          </div>
          <div class="content _repeat_">
            <div class="base">
              <div class="table_base table_base2" id="staff_table_base">
              </div>
            </div>
          </div>
        </div>
      </div>`
      : ``;
      $('#content_base').html(
        `
        <div class="section">
          <div class="section_title">
            顧客属性別の概要
            <div class="icon inline">
              <i class="fas fa-question-circle help_tips" data-title="純患数の定義" data-help="このセクションの純患数の定義は、最終来院が指定期間中であった純患者数です。また、担当者セグメントでは最終来院時に担当した顧客が表示されます。"></i>
            </div>
          </div>
          <div class="cell_btn_box cell3_btn_box" id="cell_btn_box">
          </div>
          <div class="cells_box">
            <div class="cell cell_2x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">最終来院日別トレンド
                </div>
                <div class="content _trend_">
                  <div class="base">
                    <div class="graph_wrap">
                      <canvas id="trend_line" width="250" height="100"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 desktop_elm inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">離脱者一覧
                </div>
                <div class="content _details_">
                  <div class="base">
                    <div class="btn_base"><button id="rstbtn"><i class="fas fa-file-excel"></i> 離脱者一覧.xlsx</button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cells_box">
            ${cl_s}
            ${sf_s}
            <div class="cell cell_1x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">男女年代別</div>
                <div class="content _repeat_">
                  <div class="base">
                    <div class="table_base no_border" id="geneder_table_base"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell cell_1x1 inline">
              <div class="box cell_link">
                <div class="cell_title text_overflow">
                  最終来院動機
                </div>
                <div class="content _repeat_">
                  <div class="base">
                    <div class="table_base table_base2" id="visit_reason_table_base"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
      );
    }
    const desc_cells_btn = () => {
      let col_name = ["全体","新規","既存"];
      let col_icon = [`ALL`,`<i class="fas fa-user"></i>`,`<i class="fad fa-users"></i>`];

      let sum_data_0 = oa[0].length;
      let sum_c_data_0 = coa[0].length;

      let ap = ``;
      for (let i = 0;i < 3;i++) {
        let data_0 = oa[i].length;
        let rate_0 = data_0.to_perate(sum_data_0);

        if (!cpt) {
          ap +=
          `
          <input type="radio" name="cell_input_" id="cell_input_${i}">
          <label class="cell inline" for="cell_input_${i}">
            <div class="box box_s">
              <div class="cell_title">
                <span class="icon inline">${col_icon[i]}</span> ${col_name[i]}
              </div>
              <div class="contents">
                <div class="row">
                  <div class="indi">純患数</div>
                  <div class="amounts text_overflow">
                    ${data_0.str_jp()}人
                    <span>(${rate_0}%)</span>
                    <br>
                    <div class="bb"><div class="b" style="width:${rate_0}%;"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </label>
          `;
        } else {
          let c_data_0 = coa[i].length;
          let c_rate_0 = c_data_0.to_perate(sum_c_data_0);

          ap +=
          `
          <input type="radio" name="cell_input_" id="cell_input_${i}">
          <label class="cell inline" for="cell_input_${i}">
            <div class="box box_s box_se">
              <div class="cell_title">
              <span class="icon inline">${col_icon[i]}</span> ${col_name[i]}
              </div>
              <div class="contents">
                <div class="row">
                  <div class="indi">純患数</div>
                  <div class="amounts text_overflow">
                    ${data_0.str_jp()}人
                    <span>(${rate_0}%)</span>
                    <br>
                    <div class="bb"><div class="b" style="width:${rate_0}%;"></div></div>
                  </div>
                  <div class="amounts amounts_se text_overflow">
                    ${c_data_0.str_jp()}人
                    <span>(${c_rate_0}%)</span>
                    <br>
                    <div class="bb"><div class="b b_se" style="width:${c_rate_0}%;"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </label>
          `;
        }
      }
      $('#cell_btn_box').html(ap);
    }
    const desc_dynamic_sections = (ct) => {
      (() => {
        $(`#cell_input_${ct}`).prop('checked',true);
        $('.cell_link').addClass('select_shadow');
        setTimeout(() => {$('.cell_link').removeClass('select_shadow');},1000);
      })();

      let gro = [
        {obj_id:0,obj_name:"12歳以下 男性"},
        {obj_id:1,obj_name:"12歳以下 女性"},
        {obj_id:2,obj_name:"19歳以下 男性"},
        {obj_id:3,obj_name:"19歳以下 女性"},
        {obj_id:4,obj_name:"20代 男性"},
        {obj_id:5,obj_name:"20代 女性"},
        {obj_id:6,obj_name:"30代 男性"},
        {obj_id:7,obj_name:"30代 女性"},
        {obj_id:8,obj_name:"40代 男性"},
        {obj_id:9,obj_name:"40代 女性"},
        {obj_id:10,obj_name:"50代 男性"},
        {obj_id:11,obj_name:"50代 女性"},
        {obj_id:12,obj_name:"60代 男性"},
        {obj_id:13,obj_name:"60代 女性"},
        {obj_id:14,obj_name:"70歳以上 男性"},
        {obj_id:15,obj_name:"70歳以上 女性"}
      ];

      let objs = oa[ct];
      let c_objs = coa[ct];

      const desc_trend_section = () => {
        let trend_data_arr = [];
        let trend_count_arr = [];
        let trend_c_data_arr = [];

        let tpl = [];
        const desc_leveling = () => {
          pa.forEach((label,idx) => {
            tpl.push(convert_pl(label,idx,pt));
            let result = objs.filter(({period}) => period == label);
            trend_data_arr.push(result.length);

            let total = data.data.total.filter(({period}) => period == label);
            trend_count_arr.push(total.sum_val('count'));

            if (cpt) {
              let c_label = cpa[idx];
              let c_result = c_datas.filter(({period}) => period == c_label);
              trend_c_data_arr.push(c_result.length);
            }
          });
        }
        const desc_line = () => {
          let graph_data = [{
            type:"bar",
            label:"当期",
            data:trend_data_arr,
            backgroundColor:`rgba(54,100,180,1)`,
            borderColor:`rgba(54,100,180,1)`,
            borderWidth:0,
            yAxisID: "y-axis-0",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          },{
            type:"bar",
            label:"来院数",
            data:trend_count_arr,
            backgroundColor:`rgba(54,100,180,.5)`,
            borderColor:`rgba(54,100,180,.5)`,
            borderWidth:0,
            yAxisID: "y-axis-0",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          }];
          if (cpt) {
            graph_data.push({
              type:"bar",
              label:"比較",
              data:trend_c_data_arr,
              backgroundColor:"rgba(242,100,100,1)",
              borderColor:"rgba(242,100,100,1)",
              borderWidth:0,
              yAxisID: "y-axis-0",
              cubicInterpolationMode: 'monotone',
              lineTension: 0
            })
          }
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{
              labels:{
                fontSize:10,
                boxWidth:24
              }
            },
            title: {display:false,fontSize:12,text:"",},
            elements: {
              point:{radius:0}
            },
            scales: {
              yAxes: [{
                id: "y-axis-0",
                type: "linear",
                position: "left",
                gridLines: {
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  min:0,
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:4,
                  callback: function(label, index, labels) {
                    return label.str_jp();
                  }
                },
              }],
              xAxes: [{
                barPercentage: 1,
                categoryPercentage:.8,
                stacked:true,
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  min:0,
                  fontSize:8,
                  autoSkip: true,
                  maxTicksLimit:8,
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                }
              }]
            },
            tooltips: {
              bodySpacing:5,
              titleFontSize:12.5,
              bodyFontSize:15,
              intersect:false,
              axis:'x',
              mode:'index',
              callbacks: {
                title:function(t,d) {
                  let index = t[0].index;
                  let period = pa[index];
                  period = period == undefined ? `0000-00-00` : period;
                  let week = new Date(period).getDay();
                  return `${period} (${wna[week]})`;
                },
                label:function(t,d) {
                  let index = t.index;
                  let idx = t.datasetIndex;
                  let amount = t.yLabel;
                  let ar = ["当期離反","当期来院数","比較"];
                  return `${ar[idx]} ${amount.toLocaleString()}人`;
                }
              }
            }
          }
          trend_line.data = {
            labels:tpl,
            datasets:graph_data
          };
          trend_line.options = graph_option;
          trend_line.update();
        }

        desc_leveling();
        desc_line();
      }
      const desc_excel_section = () => {
        let co = Array.from(data.data.cl);
        let so = Array.from(data.data.sf);
        let go = ["","男性","女性"];
        let ro = ["治療中","完治"];

        const download_excel = () => {
          let cuso = objs;
          if (cuso.length == 0) {alert('該当する顧客がいません。');return;}

          let today = new Date();
          let ap = ``;

          cuso.forEach((cell) => {
            let clinic = co.filter(({obj_id}) => obj_id == cell.clinic_id)[0];

            ap +=
            `
            <tr>
              <th>${user_name==MSD_smn?`患者${cell.c_ptno}`:cell.c_name}</th>
              <th>${user_name==MSD_smn?`患者${cell.c_ptno}`:cell.c_kana}</th>
              <th>${cell.period}</th>
              <th>${cell.tel}</th>
              <th>${cell.mobile}</th>
              <th>${cell.postcd}</th>
              <th>${cell.addr1}</th>
              <th>${cell.addr2}</th>
              <th>${cell.email}</th>
              <th>${user_name==MSD_smn?` 店舗${clinic.obj_id}`:clinic.obj_name}</th>
              <th>${user_name==MSD_smn?`担当者${cell.staff_name}`:cell.staff_id}</th>
              <th>${cell.age}</th>
              <th>${go[cell.gender]}</th>
              <th>${ro[cell.max_recover]}</th>
              <th>${cell.data_0}</th>
            </tr>
            `;
          });

          $('#download_table_base').html(
            `
            <tr>
              <th>名前</th>
              <th>かな</th>
              <th>最終来院日</th>
              <th>電話番号</th>
              <th>携帯電話</th>
              <th>郵便番号</th>
              <th>住所1</th>
              <th>住所2</th>
              <th>eメール</th>
              <th>院</th>
              <th>最終担当者</th>
              <th>年齢</th>
              <th>性別</th>
              <th>完治</th>
              <th>来院回数</th>
            </tr>
            ${ap}
            `
          );

          let wopts = {bookType: 'xlsx',bookSST: false,type: 'binary'};
          let workbook = {SheetNames: [],Sheets: {}};
          document.querySelectorAll('table.table_to_export').forEach(function (currentValue, index) {
            let n = currentValue.getAttribute('data-sheet-name');
            if (!n) n = 'Sheet' + index;
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
          }), `離脱顧客一覧${ps.str_date(`-`)}~${pe.str_date(`-`)}.xlsx`);
        }

        $(document).off('click','#rstbtn').on('click','#rstbtn',function() {
          download_excel();
        });
      }
      const desc_geneder_section = () => {
        let ap = ``;

        let sum_data_0 = objs.length;
        let sum_c_data_0 = c_objs.length;

        gro.forEach((cell) => {
          let result = objs.filter(({geneder_id}) => geneder_id == cell.obj_id);
          let data_0 = result.length;
          let data_1 = result.sum_val(`data_3`);
          let data_2 = data_1.to_Perate(data_0);

          let rate_0 = data_0.to_perate(sum_data_0);

          if (!cpt) {
            ap +=
            `
            <tr>
              <th>${cell.obj_name}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
              </td>
            </tr>
            `;
          } else {
            let c_result = c_objs.filter(({visit_reason_id}) => visit_reason_id == cell.obj_id);
            let c_data_0 = c_result.length;

            let c_rate_0 = c_data_0.to_perate(sum_c_data_0);

            let rates_0 = data_0.to_rate(c_data_0).rate_str();

            ap +=
            `
            <tr>
              <th>${cell.obj_name}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
                <div class="c_a">
                  ${c_data_0.str_jp()}
                  <span>(${c_rate_0}%)</span>
                  <div class="bb cb" style="width:${c_rate_0}%;"></div>
                </div>
                ${rates_0}
              </td>
            </tr>
            `;
          }
        });

        $('#geneder_table_base').html(
          `
          <table id="geneder_table">
            <thead>
              <tr>
                <th>-</th>
                <th>該当数</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );

        let table = $('#geneder_table').DataTable({
          columnDefs:[{type:'currency',targets:[1]}],
          displayLength:10,
          lengthChange: false,
          searching: false,
          ordering: true,
          info: true,
          paging: true,
          order:[[1,"desc"]]
        });
      }
      const desc_clinic_section = () => {
        if (st != 0) return;
        let ap = ``;
        let co = data.data.cl;

        let sum_data_0 = objs.length;
        let sum_c_data_0 = c_objs.length;

        co.forEach((cell) => {
          let result = objs.filter(({clinic_id}) => clinic_id == cell.obj_id);
          let data_0 = result.length;

          let rate_0 = data_0.to_perate(sum_data_0);

          let link =
          `
          <a href="/achieve_analytics?st=1&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
            ${user_name==MSD_smn?`店舗${cell.obj_id}`: cell.obj_name}
          </a>
          `;

          if (!cpt) {
            ap +=
            `
            <tr>
              <th>${link}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
              </td>
            </tr>
            `;
          } else {
            let c_result = c_objs.filter(({staff_id}) => staff_id == cell.obj_id);
            let c_data_0 = c_result.length;

            let c_rate_0 = c_data_0.to_perate(sum_c_data_0);

            let rates_0 = data_0.to_rate(c_data_0).rate_str();

            ap +=
            `
            <tr>
              <th>${link}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
                <div class="c_a">
                  ${c_data_0.str_jp()}
                  <span>(${c_rate_0}%)</span>
                  <div class="bb cb" style="width:${c_rate_0}%;"></div>
                </div>
                ${rates_0}
              </td>
            </tr>
            `;
          }
        });

        $('#clinic_table_base').html(
          `
          <table id="clinic_table">
            <thead>
              <tr>
                <th>-</th>
                <th>該当数</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );

        let table = $('#clinic_table').DataTable({
          columnDefs:[{type:'currency',targets:[1]}],
          displayLength:10,
          lengthChange: false,
          searching: true,
          ordering: true,
          info: true,
          paging: true,
          order:[[1,"desc"]]
        });
      }
      const desc_staff_section = () => {
        if (st == 2) return;
        let ap = ``;
        let so = data.data.sf;
        let c_so = data.cdata.sf;

        let sum_data_0 = objs.length;
        let sum_c_data_0 = c_objs.length;

        let sum_od_0 = so.sum_val(`od_0`);
        let sum_rod_0 = sum_data_0.to_perate(sum_od_0);

        let sum_c_od_0 = c_so.sum_val(`od_0`);
        let sum_c_rod_0 = sum_c_data_0.to_perate(sum_c_od_0);

        let all_data_0 = data.data.all.sum_val(`data_0`);
        let all_c_data_0 = data.cdata.all.sum_val(`data_0`);

        so.forEach((cell) => {
          let result = objs.filter(({staff_id}) => staff_id == cell.obj_id);
          let data_0 = result.length;

          let od_0 = cell.od_0;
          let rate_0 = data_0.to_perate(sum_data_0);

          let rod_0 = data_0.to_perate(od_0);

          let rm = rod_0.to_Perate(sum_rod_0);
          let rr = od_0.to_perate(all_data_0);
          let ri = (rod_0 * rr).to_Perate(100);

          let link = ``;
          if (cls.filter(({id}) => id == cell.clinic_id).exist_val()) {
            link =
            `
            <a href="/achieve_analytics?st=2&ss=true&si=${cell.obj_id}&pt=${pt}&psel=true&ps=${ps}&pe=${pe}">
              ${user_name==MSD_smn?`担当者${cell.obj_id}`: cell.obj_name}
            </a>
            `;
          } else {
            link = `${user_name==MSD_smn?`${stna[2]}${cell.obj_id}`: cell.obj_name}`;
          }

          if (!cpt) {
            ap +=
            `
            <tr>
              <th>${link}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
              </td>
              <td>
                ${rod_0}%
                <span>(${data_0}/${od_0})</span>
                <div class="bb" style="width:${rod_0}%;"></div>
              </td>
              <td>
                ${rr}%
                <div class="bb" style="width:${rr}%;"></div>
              </td>
              <td>
                ${ri}%
                <div class="bb" style="width:${ri}%;"></div>
              </td>
              <td>${rm}</td>
            </tr>
            `;
          } else {
            let c_cell = c_so.filter(({obj_id}) => obj_id == cell.obj_id);
            let c_result = c_objs.filter(({staff_id}) => staff_id == cell.obj_id);
            let c_data_0 = c_result.length;

            let c_od_0 = c_cell.sum_val(`od_0`);
            let c_rate_0 = c_data_0.to_perate(sum_c_data_0);

            let c_rod_0 = c_data_0.to_perate(c_od_0);

            let c_rm = c_rod_0.to_Perate(sum_c_rod_0);
            let c_rr = c_od_0.to_perate(all_c_data_0);
            let c_ri = (c_rod_0 * c_rr).to_Perate(100);


            let rates_0 = data_0.to_rate(c_data_0).rate_con_str();
            let rates_1 = rod_0.to_rate(c_rod_0).rate_con_str();
            let rates_2 = (rm - c_rm).margin_con_str(``);
            let rates_3 = ri.to_rate(c_ri).rate_con_str();

            ap +=
            `
            <tr>
              <th>${link}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
                <div class="c_a">
                  ${c_data_0.str_jp()}
                  <span>(${c_rate_0}%)</span>
                  <div class="bb cb" style="width:${c_rate_0}%;"></div>
                </div>
                ${rates_0}
              </td>
              <td>
                ${rod_0}%
                <span>(${data_0}/${od_0})</span>
                <div class="bb" style="width:${rod_0}%;"></div>
                <div class="c_a">
                  ${c_rod_0}%
                  <span>(${c_data_0}/${c_od_0})</span>
                  <div class="bb cb" style="width:${c_rod_0}%;"></div>
                </div>
                ${rates_1}
              </td>
              <td>
                ${rm}
                <div class="c_a">${c_rm}</div>
                ${rates_2}
              </td>
              <td>
                ${rr}%
                <div class="bb" style="width:${rr}%;"></div>
                <div class="c_a">
                  ${c_rr}%
                  <div class="bb cb" style="width:${c_rr}%;"></div>
                </div>
              </td>
              <td>
                ${ri}%
                <div class="bb" style="width:${ri}%;"></div>
                <div class="c_a">
                  ${c_ri}%
                  <div class="bb cb" style="width:${c_ri}%;"></div>
                </div>
                ${rates_3}
              </td>
            </tr>
            `;
          }
        });

        $('#staff_table_base').html(
          `
          <table id="staff_table">
            <thead>
              <tr>
                <th>-</th>
                <th>該当数</th>
                <th>離脱確率</th>
                <th>影響範囲</th>
                <th>離脱割合</th>
                <th>影響倍率</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );

        let table = $('#staff_table').DataTable({
          columnDefs:[{type:'currency',targets:[1,2,3,4,5]}],
          displayLength:10,
          lengthChange: false,
          searching: true,
          ordering: true,
          info: true,
          paging: true,
          order:[[1,"desc"]]
        });
      }
      const desc_visit_reason_section = () => {
        let ap = ``;

        let vro = Array.from(data.data.vr);
        vro.push({obj_id:0,obj_name:"無回答"});

        let sum_data_0 = objs.length;
        let sum_c_data_0 = c_objs.length;

        vro.forEach((cell) => {
          let result = objs.filter(({visit_reason_id}) => visit_reason_id == cell.obj_id);
          let data_0 = result.length;

          let rate_0 = data_0.to_perate(sum_data_0);

          if (!cpt) {
            ap +=
            `
            <tr>
              <th>${cell.obj_name}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
              </td>
            </tr>
            `;
          } else {
            let c_result = c_objs.filter(({visit_reason_id}) => visit_reason_id == cell.obj_id);
            let c_data_0 = c_result.length;

            let c_rate_0 = c_data_0.to_perate(sum_c_data_0);

            let rates_0 = data_0.to_rate(c_data_0).rate_str();

            ap +=
            `
            <tr>
              <th>${cell.obj_name}</th>
              <td>
                ${data_0.str_jp()}
                <span>(${rate_0}%)</span>
                <div class="bb" style="width:${rate_0}%;"></div>
                <div class="c_a">
                  ${c_data_0.str_jp()}
                  <span>(${c_rate_0}%)</span>
                  <div class="bb cb" style="width:${c_rate_0}%;"></div>
                </div>
                ${rates_0}
              </td>
            </tr>
            `;
          }
        });

        $('#visit_reason_table_base').html(
          `
          <table id="visit_reason_table">
            <thead>
              <tr>
                <th>-</th>
                <th>該当数</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );

        let table = $('#visit_reason_table').DataTable({
          columnDefs:[{type:'currency',targets:[1]}],
          displayLength:10,
          lengthChange: false,
          searching: true,
          ordering: true,
          info: true,
          paging: true,
          order:[[1,"desc"]]
        });
      }

      desc_trend_section();
      desc_excel_section();
      desc_geneder_section();
      desc_clinic_section();
      desc_staff_section();
      desc_visit_reason_section();
    }

    desc_content_leveling();
    const desc_graph_init = (sender1,sender2,sender3,sender4) => {
      eval(`try {${sender1}.destroy();} catch(err) {}`);
      eval(`${sender2}.canvas.height = 100;`);
      eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
    }

    let trend_line;

    let trend_line_ctx = document.getElementById('trend_line').getContext('2d');
    desc_graph_init("trend_line","trend_line_ctx",'bar');

    desc_cells_btn();
    desc_dynamic_sections(0);
    $(document).off('input','input[name="cell_input_"]').on('input','input[name="cell_input_"]',function() {
      let index = $('input[name="cell_input_"]').index(this);
      desc_dynamic_sections(Number(index));
    });
  }
}

var desc_menu_option = (index) => {
  $('.menu_select').html(sender_menus_so[Number(index)]);
}
var desc_menu_query_data = async (bt) => {
  let pt = $('input[name="pt_"]:checked').prop('id').split('_')[1];
  let ps = getDOM(`pi_s`).value;
  let pe = getDOM(`pi_e`).value;
  let st = $('input[name="st_"]:checked').prop('id').split('_')[1];
  let sid = $('#cmb_nt').prop('data-id').split('_')[1];
  let cpt = getDOM(`cpt`).checked;
  let cid = $('#consb option:selected').prop('value');
  let cps = getDOM(`cpi_s`).value || "0000-00-00";
  let cpe = getDOM(`cpi_e`).value || "0000-00-00";
  let mt = $('#menu_type_select option:selected').prop('value');
  let mid = $('#menu_select option:selected').prop('value');
  let cmid = cpt ? $('#c_menu_select option:selected').prop('value') : 0;

  (() => {
    $('#setting_m').prop('checked',false);
    $('#setting_menu_indi').html(
      `
      <div class="cell inline"><i class="fad fa-folders"></i></div>
      <div class="cell inline">${$('#menu_type_select option:selected').html()}</div>
      <div class="cell inline">${$('#menu_select option:selected').html()}</div>
      <div class="cell inline"><i class="far fa-balance-scale-left"></i></div>
      <div class="cell inline">${cpt ? $('#c_menu_select option:selected').html() : `なし`}</div>
      <div class="cell cell_indi inline"><i class="fas fa-caret-down"></i></div>
      `
    );
  })();

  const sender_data = {
    pt:Number(pt),
    ps:ps,
    pe:pe,
    st:Number(st),
    sid:Number(sid),
    cpt:cpt,
    cid:Number(cid),
    cps:cps,
    cpe:cpe,
    bt:bt,
    mt:mt,
    mid:mid,
    cmid:cmid
  }

  let result = await ajax_api_function("achieve_analytics_obj",sender_data);
  return result;
}
var desc_obj_query = (sender_data) => {
  let bt = $('input[name="segment_input_"]:checked').prop('id').split('_')[2];
  sender_data.bt = Number(bt);

  $('#content_base').html(
    `
    <div class="loading_base inline">
      <i class="fad fa-spinner-third fa-spin"></i>
    </div>
    `
  );

  $('.segment_base input').prop('disabled',true);
  setTimeout(async () => {
    if (segment_objs[bt].dataExists || bt == 3 || bt == 4) {
      $('.segment_base input').prop('disabled',false);
      desc_obj_page();
    } else {
      let result = await ajax_api_function("achieve_analytics_obj",sender_data);
      $('.segment_base input').prop('disabled',false);
      if (result.dataExists) {
        segment_objs[bt] = result;
        desc_obj_page();
      } else {
        alert(`データ通信エラー:${result.reason}`);
      }
    }
  },500);
}
var desc_obj_query_data = () => {
  segment_objs = [
    {dataExists:false,data:{}},
    {dataExists:false,data:{}},
    {dataExists:false,data:{}},
    {dataExists:false,data:{}},
    {dataExists:false,data:{}},
    {dataExists:false,data:{}},
    {dataExists:false,data:{}},
    {dataExists:false,data:{}}
  ];

  let pt = $('input[name="pt_"]:checked').prop('id').split('_')[1];
  let ps = getDOM(`pi_s`).value;
  let pe = getDOM(`pi_e`).value;
  let st = $('input[name="st_"]:checked').prop('id').split('_')[1];
  let sid = $('#cmb_nt').prop('data-id').split('_')[1];
  let cpt = getDOM(`cpt`).checked;
  let cid = $('#consb option:selected').prop('value');
  let cps = getDOM(`cpi_s`).value || "0000-00-00";
  let cpe = getDOM(`cpi_e`).value || "0000-00-00";

  (() => {
    let cpts = cpt ?`比較する`:`比較しない`;
    let cpa = cpt ? `<div class="cell inline">${cps.str_date(`.`)} - ${cpe.str_date(`.`)}</div>` : ``;
    let cn = $('#consb option:selected').html();

    $('#setting_cp').prop('checked',false);

    $('#setting_cp_indi').html(
      `
      <div class="cell inline"><i class="far fa-balance-scale-left"></i></div>
      <div class="cell inline">${cpts}</div>
      ${cpt && st != 0 ? `<div class="cell inline">${cn}</div>` : ``}
      ${cpa}
      <div class="cell cell_indi inline"><i class="fas fa-caret-down"></i></div>
      `
    );

    $('#content_base').html(`
      <div class="loading_base inline">
        <i class="fad fa-spinner-third fa-spin"></i>
      </div>
    `);
  })();

  const sender_data = {
    pt:Number(pt),
    ps:ps,
    pe:pe,
    st:Number(st),
    sid:Number(sid),
    cpt:cpt,
    cid:Number(cid),
    cps:cps,
    cpe:cpe
  }

  $(document).off('input','input[name="segment_input_"]').on('input','input[name="segment_input_"]',function() {
    desc_obj_query(sender_data);
  });
  desc_obj_query(sender_data);
}
var desc_obj_sp_leveling = () => {
  let pt = Number($('input[name="pt_"]:checked').prop('id').split('_')[1]);
  let st = Number($('input[name="st_"]:checked').prop('id').split('_')[1]);
  let ps = getDOM(`pi_s`).value;
  let pe = getDOM(`pi_e`).value;
  let sender = $('#segment_select option:selected').prop('value') | 0;

  $('#cmb_nt').prop('data-id',`nt_${sender}`);

  if (st == 0) {
    $('#cmb_nt').html(`<div class="icon inline" style="${stca[st]}">${stia[st]}</div> 管轄院`);
  } else {
    let result = sender_list_objs[Number(st)].filter(({obj_id}) => obj_id === Number(sender))[0];
    $('#cmb_nt').html(`<div class="icon inline" style="${stca[st]}">${stia[st]}</div> ${user_name==MSD_smn?`${stna[st]}${result.obj_id}`:result.obj_name}`);
  }

  (() => {
    $('#setting_spios').prop('checked',false);
    $('#setting_spios_indi').html(
      `
      <div class="cell cell_0 inline"><i class="fas fa-calendar-alt"></i></div>
      <div class="cell cell_1 inline">${ptna[pt]}</div>
      <div class="cell cell_2 inline">${ps.str_date(`.`)} - ${pe.str_date(`.`)}</div>
      <div class="cell cell_indi inline"><i class="fas fa-caret-down"></i></div>
      `
    );
  })();

  desc_obj_query_data();
}
var desc_obj_leveling = (sender) => {
  let st = Number($('input[name="st_"]:checked').prop('id').split('_')[1]);
  $('#cmb_nt').prop('data-id',`nt_${sender}`);
  if (st == 0) {
    $('#cmb_nt').html(`<div class="icon inline" style="${stca[st]}">${stia[st]}</div> 管轄院`);
  } else {
    let result = sender_list_objs.objs[st].filter(({obj_id}) => obj_id === Number(sender))[0];

    $('#cmb_nt').html(`<div class="icon inline" style="${stca[st]}">${stia[st]}</div> ${user_name==MSD_smn?`${stna[st]}${result.obj_id}`:result.obj_name}`);

    $('#map_list .cell').css('pointer-events','all');
    $(`#map_list_cell_${sender}`).css('pointer-events','none');
    $('#list_table tbody tr').css('pointer-events','all');
    $(`#list_table_tr_${sender}`).css('pointer-events','none');
  }
  $(`#list_table tr`).removeClass('selected');
  $(`#list_table_tr_${sender}`).addClass('selected');

  desc_obj_query_data();
}
var desc_list = () => {
  let st = Number($('input[name="st_"]:checked').prop('id').split('_')[1]);
  if (st == 0) {
    $('.center_left_base .ob').hide();
    $('#consb').hide();
    s_select = false;
    desc_obj_leveling(0);
  } else {
    let obj = sender_list_objs.objs[st];
    let data = sender_list_objs.datas[st];

    let map_ap = ``;
    let table_ap = ``;

    const desc_objs = () => {
      $('#map_list').html(``);
      let mt = Number($('input[name="mp_"]:checked').prop('id').split('_')[1]);
      let max_x = Math.max.apply(null,data.map(function(o){return o[`data_0`];})) || 0;
      let max_y = Math.max.apply(null,data.map(function(o){return o[`data_${mt + 1}`];})) || 0;

      obj.forEach((cell,idx) => {
        (() => {
          let result = data.filter(({obj_id}) => obj_id == cell.obj_id);
          cell.index = idx + 1;
          let data_x = result.sum_val(`data_0`);
          let data_y = result.sum_val(`data_${mt + 1}`);
          let rate_x = data_x.to_perate(max_x);
          let rate_y = data_y.to_perate(max_y);
          let bgc = rate_x + rate_y >= 150 ? `#36b7eb` : rate_x + rate_y >= 50 ? `#a4dbf5` : `#f26464`;
          cell.position = rate_x + rate_y >= 150 ? 1 : rate_x + rate_y >= 50 ? 2 : 3;

          map_ap +=
          `
          <button class="cell" id="map_list_cell_${cell.obj_id}" style="background-color:${bgc};bottom:${rate_y}%;left:${rate_x}%;">
            ${idx + 1}
          </button>
          `;
        })();
        (() => {
          let result = data.filter(({obj_id}) => obj_id == cell.obj_id);
          let mado = result.sum_val(`data_0`);
          let mission = result.sum_val(`data_1`).to_perate(1).perate_str();
          let bgc = cell.position == 1 ? `#36b7eb` : cell.position == 2 ? `#a4dbf5` : `#f26464`;

          table_ap +=
          `
          <tr id="list_table_tr_${cell.obj_id}">
            <th class="text_overflow">
              <div class="content text_overflow">
                <div class="num inline" style="background-color:${bgc};">${cell.index || 0}</div>
                ${user_name==MSD_smn?`${stna[st]}${cell.obj_id}`: st == 2 ? `${cell.obj_name} (${cell.pobj_name})`: `${cell.obj_name}`}
              </div>
            </th>
            <td class="text_overflow">
              <div class="content_rate">
                ${mado.toLocaleString()}
              </div>
            </td>
          </tr>
          `;
        })();
      });
      (() => {
        $(document).off('click','#map_list .cell').on('click','#map_list .cell',function() {
          let id = $(this).prop('id').split('_')[3];
          desc_obj_leveling(id);
        });
      })();
      (() => {
        $(document).off('click','#list_table tbody tr').on('click','#list_table tbody tr',function() {
          let id = $(this).prop('id').split('_')[3];
          desc_obj_leveling(id);
        });
        $(document).off('touchstart','#list_table tbody tr').on('touchstart','#list_table tbody tr',function() {
          let id = $(this).prop('id').split('_')[3];
          desc_obj_leveling(id);
        });
      })();
    }
    desc_objs();

    let os_ap = ``;
    if (st == 1) {
      obj.forEach((cell,idx) => {
        os_ap += `<option value="${cell.obj_id}">${user_name==MSD_smn?`${stna[1]}${cell.obj_id}`: cell.obj_name}</option>`;
      })
    } else {
      sender_list_objs.objs[1].forEach((cell) => {
        let result = sender_list_objs.objs[2].filter(({pobj_id}) => pobj_id == cell.obj_id);
        os_ap += `<optgroup label="院-${user_name==MSD_smn?`${stna[1]}${cell.obj_id}`: cell.obj_name}">`;
        result.forEach((cel) => {
          os_ap += `<option value="${cel.obj_id}">${user_name==MSD_smn?`${stna[2]}${cel.obj_id}`: cel.obj_name}</option>`;
        });
        os_ap += `</optgroup>`;
      });
    }

    $('#cos_select').html(os_ap);
    $('#map_list').html(map_ap);
    $('#table_list').html(
      `
      <table id="list_table">
        <thead>
          <tr>
            <th>名前</th>
            <th>総合売上</th>
          </tr>
        </thead>
        <tbody>${table_ap}</tbody>
      </table>
      `
    );
    let table = $('#list_table').DataTable({
      columnDefs:[{type:'currency',targets:[1]}],
      lengthChange:false,
      searching: false,
      ordering: true,
      info: false,
      paging: false,
      order:[1,"desc"]
    });

    $('.center_left_base .ob').show();
    $('#consb').show();
    if (s_select) {
      s_select = false;
      let s_id = getDOM(`s_id`).value;

      desc_obj_leveling(s_id);
    } else {
      let first_list_id = $('#table_list tbody tr:eq(0)').prop('id').split('_')[3];
      desc_obj_leveling(first_list_id);
    }
  }
}
var list_query = async () => {
  let form = document.forms['list_query_form'];
  let pt = Number(form.elements['pt_'].value);
  let ps = form.elements['pi_s'].value;
  let pe = form.elements['pi_e'].value;
  (() => {
    $('#setting_p').prop('checked',false);
    $('#setting_p_indi').html(
      `
      <div class="cell cell_0 inline"><i class="fas fa-calendar-alt"></i></div>
      <div class="cell cell_1 inline">${ptna[pt]}</div>
      <div class="cell cell_2 inline">${ps.str_date(`.`)} - ${pe.str_date(`.`)}</div>
      <div class="cell cell_indi inline"><i class="fas fa-caret-down"></i></div>
      `
    );
  })();

  const sender_data = {ps:ps,pe:pe}

  let result = await ajax_api_function("achieve_analytics_list",sender_data);
  if (result.dataExists) {
    sender_list_objs = result.data;
    desc_list();
  } else {
    alert(`データ通信エラー:${result.reason}`);
  }
}

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);

  $(document).ready(async function(){
    (() => {
      jQuery(function($) {
        $.extend( $.fn.dataTable.defaults, {
          language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
          }
        });
      });
    })();

    const desc_init = async () => {
      let menus = await ajax_api_function("read_menus_objs","");
      if (menus.dataExists) {
        sender_menus_objs = [
          menus.data_cate1,
          menus.data_cate2,
          menus.data_cate3,
          menus.data_keyword,
          menus.data_menu
        ];

        sender_menus_so = ["","","","",""];
        let cate1 = menus.data_cate1;

        cate1.forEach((cel) => {
          (() => {
            sender_menus_so[0] += `<option value="${cel.id}">大 - ${cel.name}</option>`;
            sender_menus_so[1] += `<optgroup label="大-${cel.name}">`;
            sender_menus_so[2] += `<optgroup label="大-${cel.name}">`;
            sender_menus_so[4] += `<optgroup label="大-${cel.name}">`;
          })();
          (() => {
            let cate2 = menus.data_cate2.filter(({parent_category1_id}) => parent_category1_id == cel.id);
            cate2.forEach((cell) => {
              sender_menus_so[1] += `<option value="${cell.id}">中 - ${cell.name}</option>`;
              sender_menus_so[2] += `<optgroup label="&nbsp;&nbsp;中-${cell.name}">`;

              let cate3 = menus.data_cate3.filter(({parent_category1_id}) => parent_category1_id == cell.id);
              cate3.forEach((celll) => {
                sender_menus_so[2] += `<option value="${celll.id}">小 - ${celll.name}</option>`;
              });
              sender_menus_so[2] += `</optgroup>`;
            });
          })();
          (() => {
            let menuss = menus.data_menu.filter(({category1_id}) => category1_id == cel.id);
            menuss.forEach((cellll) => {
              sender_menus_so[4] += `<option value="${cellll.id}">施 - ${cellll.name}</option>`;
            });
          })();
          (() => {
            sender_menus_so[1] += `</optgroup>`;
            sender_menus_so[2] += `</optgroup>`;
            sender_menus_so[4] += `</optgroup>`;
          })();
        });

        let kywds = menus.data_keyword;
        kywds.forEach((cell) => {
          sender_menus_so[3] += `<option value="${cell.id}">キ - ${cell.name}</option>`;
        });
      } else {
        alert(`データ通信エラー:${result.reason}`);
      }
      $(document).off('change','#menu_type_select').on('change','#menu_type_select',function() {
        let index = $(`#menu_type_select option:selected`).prop('value');
        desc_menu_option(index);
      });


      let width = window.innerWidth;
      if (width <= 767) {
        $('.center_left_base').remove();
        $('#setting_sp_b').html(
          `
          <div class="setting_box inline">
            <input class="input_label" type="checkbox" id="setting_spios" checked>
            <label class="label_indi inline" for="setting_spios" id="setting_spios_indi">
              <div class="cell inline"></div>
              <div class="cell inline"></div>
              <div class="cell inline"></div>
            </label>
            <div class="modal">
              <div class="modal_title">
                <i class="fas fa-cogs"></i> 期間の設定
                <label for="setting_ios"><i class="fas fa-times"></i></label>
              </div>
              <form onsubmit="desc_obj_sp_leveling(); return false;" name="query_form">
                <div class="box">
                  <div class="indi">期間軸</div>
                  <div class="content">
                    <div class="radio_label">
                      <input type="radio" name="pt_" id="pt_0" value="0" checked>
                      <label for="pt_0"><div class="icon inline"></div>日別</label>
                      <input type="radio" name="pt_" id="pt_1" value="1">
                      <label for="pt_1"><div class="icon inline"></div>週別</label>
                      <input type="radio" name="pt_" id="pt_2" value="2">
                      <label for="pt_2"><div class="icon inline"></div>月別</label>
                    </div>
                  </div>
                </div>
                <div class="box">
                  <div class="indi">指定期間</div>
                  <div class="content">
                    <div class="pibb">
                      <input class="pi_" type="date" name="pi_s" id="pi_s" required>
                      <div class="border">~</div>
                      <input class="pi_" type="date" name="pi_e" id="pi_e" required>
                    </div>
                    <div class="pilbb" id="pilb_pi_"></div>
                  </div>
                </div>
                <div class="box">
                  <div class="indi">セグメント</div>
                  <div class="content">
                    <div class="radio_label">
                      <input type="radio" name="st_" id="st_0" value="0" checked>
                      <label for="st_0"><div class="icon inline"></div>管轄院</label>
                      <input type="radio" name="st_" id="st_1" value="1">
                      <label for="st_1"><div class="icon inline"></div>店舗別</label>
                      <input type="radio" name="st_" id="st_2" value="2">
                      <label for="st_2"><div class="icon inline"></div>担当者</label>
                    </div>
                  </div>
                </div>
                <div class="box" id="setting_obj_box">
                  <div class="indi">オブジェクト</div>
                  <div class="content">
                    <div class="oibb">
                      <div class="select_box">
                        <select id="segment_select">
                        </select>
                        <div class="icon_base">
                          <i class="fas fa-caret-down"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="box_submit">
                  <div class="indi"></div>
                  <div class="content">
                    <div class="submit_base">
                      <button type="submit">適用する <i class="fas fa-caret-down"></i></button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          `
        );

        (async () => {
          let cls = await ajax_api_function("read_clinic_objs","");
          let sfs = await ajax_api_function("read_staff_objs","");
          if (cls.dataExists && sfs.dataExists) {
            sender_list_objs = [[],cls.data,sfs.data];
            let ap_cl = ``;
            let ap_sf = ``;

            cls.data.forEach((cell,i) => {
              ap_cl += `<option value="${cell.obj_id}">${cell.obj_name}</option>`;

              ap_sf += `<optgroup label="${cell.obj_name}"></optgroup>`;
              let result = sfs.data.filter(({clinic_id}) => clinic_id == cell.obj_id);
              result.forEach((cel,idx) => {
                ap_sf += `<option value="${cel.obj_id}">${cel.obj_name}</option>`;
              });
            });
            $('#filter_clinic_0').html(ap_cl);
            $('#filter_staff_0').html(ap_sf);

            (async () => {
              let st = getDOM('s_type').value;
              $(`#st_${st}`).prop('checked',true);
              if (st != 0) {
                $('#segment_select').html(`${[ap_cl,ap_sf][st-1]}`);
              } else {
                $('#setting_obj_box').hide();
              }

              let pt = getDOM(`p_type`).value|0;
              $(`#pt_${pt}`).prop('checked',true);
              await psl_setter(0,"pi");
              await psln_setter(pt);
              if (p_select) {
                p_select = false;
                let ps = getDOM(`ps`).value;
                let pe = getDOM(`pe`).value;
                $('#pi_s').prop('value',ps);
                $('#pi_e').prop('value',pe);
              }
              let bt = getDOM(`b_type`).value;
              $(`#segment_input_${bt}`).prop('checked',true);

              const sp_so = () => {
                let index = $('input[name="st_"]:checked').prop('id').split('_')[1];
                if (index == 0) {
                  $('#setting_obj_box').hide();
                  $('#consb').hide();
                } else {
                  $('#consb').show();
                  $('#setting_obj_box').show();
                  $('#segment_select').html(`${[ap_cl,ap_sf][index-1]}`);
                  $('#cos_select').html(`${[ap_cl,ap_sf][index-1]}`);
                }
              }
              $(document).off('input','input[name="st_"]').on('input','input[name="st_"]',function() {
                sp_so();
              });
              sp_so();

              desc_obj_sp_leveling();
            })();
          } else {
            alert(`データ通信エラー:${cls.reason}`);
          }
        })();
      } else {
        $(document).off('input','input[name="st_"]').on('input','input[name="st_"]',function() {desc_list();});
        $(document).off('input','input[name="mp_"]').on('input','input[name="mp_"]',function() {desc_list();});

        (async () => {
          let st = getDOM('s_type').value;
          $(`#st_${st}`).prop('checked',true);

          let pt = getDOM(`p_type`).value|0;
          $(`#pt_${pt}`).prop('checked',true);
          await psl_setter(0,"pi");
          await psln_setter(pt);

          if (p_select) {
            p_select = false;
            let ps = getDOM(`ps`).value;
            let pe = getDOM(`pe`).value;
            $('#pi_s').prop('value',ps);
            $('#pi_e').prop('value',pe);
          }
          let bt = getDOM(`b_type`).value;
          $(`#segment_input_${bt}`).prop('checked',true);

          await list_query();
        })();
      }
    }
    desc_init();
  });
}
