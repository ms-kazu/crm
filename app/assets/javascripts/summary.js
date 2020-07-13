var user_name = getDOM('user_name').value;

var desc_function = (data,so) => {
  let ps = so.ps;
  let pe = so.pe;
  let pa = period_map(ps,pe,0);

  const desc_content_leveling = () => {
    $('#content_base').html(
      `
      <div class="section">
        <div class="section_title">
          今日の概要
          <span style="font-size:.7rem;color:#333;" id="day_trend_indi">データ更新時刻 : --:--</span>
        </div>
        <div class="cells_box">
          <div class="cell cell_4x1 inline">
            <div class="box day_box">
              <div class="content">
                <div class="cover" id="day_trend_cover">
                  <div class="text">
                    <i class="fad fa-spinner-third fa-spin"></i>
                  </div>
                </div>
                <div class="day_base">
                  <div class="left">
                    <div class="base">
                      <div class="switch_base">
                        <input type="radio" name="s0_input_" id="s0_input_0" checked>
                        <label for="s0_input_0" id="s0_input_label_0">今日(-/-)</label>
                        <input type="radio" name="s0_input_" id="s0_input_1">
                        <label for="s0_input_1" id="s0_input_label_1">昨日(-/-)</label>
                        <button class="redo" id="day_redo">
                          <i class="fas fa-redo"></i>
                        </button>
                      </div>
                      <div class="graph_wrap">
                        <canvas id="day_bar" width="200" height="100"></canvas>
                      </div>
                      <div class="table_base table_base1 no_border" id="day_sum_table_base">
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <div class="table_base table_base2" id="day_clinic_table_base">
                    </div>
                    <div class="table_base table_base2" id="day_staff_table_base">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section_title">今月の概要</div>
        <div class="cells_box">
          <div class="cell cell_2x1 cell_sync inline">
            <div class="box">
              <div class="cell_title text_overflow">
                今月のトレンド
                <div class="icon inline">
                  <i class="fas fa-question-circle help_tips" data-title="セルのクリック" data-help="セルをクリックするとトレンドセクションの値が更新されます。"></i>
                </div>
              </div>
              <div class="content _details_box_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="trend_line" width="300" height="100"></canvas>
                  </div>
                  <div class="details_cell_base" id="remarks_base">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">
                総合売上の予測
                <div class="icon inline">
                  <i class="fas fa-question-circle help_tips" data-title="売上予測" data-help="過去30日以内の曜日別平均値が予測値として表示されます。"></i>
                </div>
                <div class="link_base">
                  <a href="/sales_forecast?s_type=0">
                    <div class="link inline">詳しく見る <i class="fas fa-caret-right"></i></div>
                  </a>
                </div>
              </div>
              <div class="content _trend_">
                <div class="graph_wrap" style="padding:0;">
                  <canvas id="forecast_line" width="250" height="100"></canvas>
                </div>
                <div class="table_base" id="forecast_table_base">
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">予実乖離・目標完了数</div>
              <div class="content _mission_">
                <div class="base">
                  <div class="switch_base">
                    <input type="radio" name="s3_input_" id="s3_input_0" checked>
                    <label for="s3_input_0">窓口売上</label>
                    <input type="radio" name="s3_input_" id="s3_input_1">
                    <label for="s3_input_1">来院数</label>
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
          <div class="cell cell_2x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">
                過去6週の週次トレンド
                <div class="link_base">
                  <a href="/achieve_analytics?st=0&pt=1&psel=true&ps=${so.pw0}&pe=${so.pw1}">
                    <div class="link inline">詳しく見る <i class="fas fa-caret-right"></i></div>
                  </a>
                </div>
              </div>
              <div class="content _trend_">
                <div class="graph_wrap" style="padding:0;">
                  <canvas id="week_line" width="500" height="100"></canvas>
                </div>
                <div class="table_base table_base_padding table_base2" id="week_table_base">
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_2x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">
                過去6ヶ月の月次トレンド
                <div class="link_base">
                  <a href="/achieve_analytics?st=0&pt=2&psel=true&ps=${so.pm0}&pe=${so.pm1}">
                    <div class="link inline">詳しく見る <i class="fas fa-caret-right"></i></div>
                  </a>
                </div>
              </div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap" style="padding:0;">
                    <canvas id="month_line" width="500" height="100"></canvas>
                  </div>
                  <div class="table_base table_base_padding table_base2" id="month_table_base">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">店舗別</div>
              <div class="content _summary_page_ _table_list_">
                <div class="base">
                  <div class="table_base table_base2" id="clinic_table_base">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">担当者別</div>
              <div class="content _summary_page_ _table_list_">
                <div class="base">
                  <div class="table_base table_base2" id="staff_table_base">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">
                施術カテゴリ
                <div class="link_base">
                  <a href="/achieve_analytics?psel=true&ps=${ps}&pe=${pe}&bt=2">
                    <div class="link inline">詳しく見る <i class="fas fa-caret-right"></i></div>
                  </a>
                </div>
              </div>
              <div class="content _summary_page_ _table_list_">
                <div class="base">
                  <div class="table_base no_border" id="cate_table_base">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">顧客属性</div>
              <div class="content _summary_page_ _table_list_">
                <div class="base">
                  <div class="table_base no_border no_border2" id="customer_table_base">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_3x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">マッピング</div>
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
                  <div id="canvas_map" class="long_map">
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
            <div class="box">
              <div class="cell_title text_overflow">キーワード</div>
              <div class="content _summary_page_ _table_list_">
                <div class="base">
                  <div class="table_base table_base2" id="keyword_table_base">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">割引券・回数券</div>
              <div class="content _summary_page_ _table_list_">
                <div class="base">
                  <div class="table_base table_base2" id="coupon_table_base">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 desktop_elm inline">
            <div class="box">
              <div class="cell_title text_overflow">7日前の離反顧客</div>
              <div class="content _summary_page_ _table_list_">
                <div class="base">
                  <div class="table_base table_base2" id="left_table_base">
                  </div>
                  <div class="btn_base" style="text-align:right;">
                    <button id="left_customer">
                      <i class="fas fa-file-excel"></i> 顧客一覧.xlsx
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_2x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">
                継続・離脱
                <div class="link_base">
                  <a href="/achieve_analytics?psel=true&ps=${ps}&pe=${pe}&bt=5">
                    <div class="link inline">詳しく見る <i class="fas fa-caret-right"></i></div>
                  </a>
                </div>
              </div>
              <div class="content _trend_">
                <div class="base" style="margin:0;">
                  <div class="graph_wrap" style="padding:0;">
                    <canvas id="count_line" width="300" height="100"></canvas>
                  </div>
                  <div class="table_base table_base_td_th table_base1 no_border2" id="count_table_base">
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
    let gender_arr = ["","男性","女性"];

    const desc_day = () => {
      let sum_amount = 0;
      let reloading_process = false;

      const desc_daily_content = async () => {
        reloading_process = true;
        $('#day_trend_cover').fadeIn();

        let today = new Date();
        let day0 = `${today.dD()}`;
        let day1 = `${today.aD(-1).dD()}`;
        let day2 = `${today.aD(-7).dD()}`;
        let day3 = `${today.aD(-8).dD()}`;

        const sender_data = {
          day0:day0,
          day1:day1,
          day2:day2,
          day3:day3
        }

        let result = await ajax_api_function("day_summary",sender_data);
        if (result.dataExists) {

          (() => {
            let hour = today.getHours();
            let minutes = today.getMinutes();
            $('#day_trend_indi').text(`データ更新時刻 : ${hour}:${minutes}`);

            $('#s0_input_label_0').html(`今日(${today.getMonth()+1}/${today.getDate()})`);
            $('#s0_input_label_1').html(`昨日`);
          })();
          let obj = result.data.day;

          const desc__ = (st) => {
            const desc_bar = () => {
              let result = obj.filter(({period}) => period == sender_data[`${st==0?`day0`:`day1`}`]);
              let c_result = obj.filter(({period}) => period == sender_data[`${st==0?`day2`:`day3`}`]);

              let data_arr = [];
              let data_c_arr = [];
              let tpl = [];
              for (let i = 0;i < 23;i++) {
                tpl.push(`${i}:00`);
                let rslt = result.filter(({time}) => time == i);
                let data_0 = rslt.sum_val('data_0');
                data_arr.push(data_0);

                (() => {
                  let c_rslt = c_result.filter(({time}) => time == i);
                  let c_data_0 = c_rslt.sum_val('data_0');
                  data_c_arr.push(c_data_0);
                })();
              }

              const desc_graph = () => {
                let graph_data = [{
                  label:"総合売上",
                  data:data_arr,
                  backgroundColor:`rgba(54,100,180,1)`,
                  borderColor:"rgba(54,100,180,1)",
                  borderWidth:1.5,
                  pointRadius:5,
                  pointBackgroundColor:"#fff",
                  fill:true,
                  cubicInterpolationMode: 'monotone',
                  lineTension: 0
                },{
                  label:"前同曜日",
                  data:data_c_arr,
                  backgroundColor:`rgba(242,100,100,1)`,
                  borderColor:"rgba(242,100,100,1)",
                  borderWidth:1.5,
                  pointRadius:5,
                  pointBackgroundColor:"#fff",
                  fill:true,
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
                        return `${tpl[index]}`;
                      },
                      label:function(t,d) {
                        let index = t.index;
                        let idx = t.datasetIndex;
                        let amount = t.yLabel;
                        let ar = ["総合売上","前週比"];
                        return `${ar[idx]} ¥${amount.toLocaleString()}`;
                      }
                    }
                  }
                }
                day_bar.data = {
                  labels:tpl,
                  datasets:graph_data
                };
                day_bar.options = graph_option;
                day_bar.update();
              }
              desc_graph();
            }
            const desc_summary = () => {
              let ap = ``;

              let result = obj.filter(({period}) => period == sender_data[`${st==0?`day0`:`day1`}`]);
              let c_result = obj.filter(({period}) => period == sender_data[`${st==0?`day2`:`day3`}`]);

              let data_0 = result.sum_val('data_0');
              let data_1 = result.sum_val('data_1');
              let data_2 = result.sum_val('data_2');
              let data_3 = result.sum_val('data_3');
              let data_4 = result.sum_val('data_4');
              let data_5 = result.sum_val('data_5');

              let c_data_0 = c_result.sum_val('data_0');
              let c_data_1 = c_result.sum_val('data_1');
              let c_data_2 = c_result.sum_val('data_2');
              let c_data_3 = c_result.sum_val('data_3');
              let c_data_4 = c_result.sum_val('data_4');
              let c_data_5 = c_result.sum_val('data_5');

              let rate_0 = data_0.to_perate(c_data_0).rate_str();
              let rate_1 = data_1.to_perate(c_data_1).rate_str();
              let rate_2 = data_2.to_perate(c_data_2).rate_str();
              let rate_3 = data_3.to_perate(c_data_3).rate_str();
              let rate_4 = data_4.to_perate(c_data_4).rate_str();
              let rate_5 = data_5.to_perate(c_data_5).rate_str();

              ap =
              `
              <table>
                <tr>
                  <th></th>
                  <th>総合売上</th>
                  <th>保険請求</th>
                  <th>保険負担金</th>
                  <th>自費売上</th>
                  <th>来院数</th>
                  <th>新患数</th>
                </tr>
                <tr>
                  <th>${["今日","昨日"][st]}</th>
                  <td>${data_0.toLocaleString()}</td>
                  <td>${data_1.toLocaleString()}</td>
                  <td>${data_2.toLocaleString()}</td>
                  <td>${data_3.toLocaleString()}</td>
                  <td>${data_4.toLocaleString()}</td>
                  <td>${data_5.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>前同曜日</th>
                  <td>${c_data_0.toLocaleString()}</td>
                  <td>${c_data_1.toLocaleString()}</td>
                  <td>${c_data_2.toLocaleString()}</td>
                  <td>${c_data_3.toLocaleString()}</td>
                  <td>${c_data_4.toLocaleString()}</td>
                  <td>${c_data_5.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>変化</th>
                  <td>${rate_0}</td>
                  <td>${rate_1}</td>
                  <td>${rate_2}</td>
                  <td>${rate_3}</td>
                  <td>${rate_4}</td>
                  <td>${rate_5}</td>
                </tr>
              </table>
              `;

              $('#day_sum_table_base').html(ap);
            }
            const desc_clinic_table = (obj) => {
              let result = obj.filter(({period}) => period == sender_data[`${st==0?`day0`:`day1`}`]);
              let c_result = obj.filter(({period}) => period == sender_data[`${st==0?`day2`:`day3`}`]);

              let ap = ``;
              result.forEach((cell) => {
                let rslt = result.filter(({obj_id}) => obj_id == cell.obj_id);
                let data_0 = rslt.sum_val('data_0');
                let data_1 = rslt.sum_val('data_1');
                let data_2 = rslt.sum_val('data_2');

                let c_rslt = c_result.filter(({obj_id}) => obj_id == cell.obj_id);
                let c_data_0 = c_rslt.sum_val('data_0');
                let c_data_1 = c_rslt.sum_val('data_1');
                let c_data_2 = c_rslt.sum_val('data_2');

                let rate_0 = data_0.to_perate(c_data_0).rate_str();
                let rate_1 = data_1.to_perate(c_data_1).rate_str();
                let rate_2 = data_2.to_perate(c_data_2).rate_str();

                ap +=
                `
                <tr>
                  <th>${user_name==MSD_smn?`店舗${cell.obj_id}`:cell.obj_name}</th>
                  <td>
                    <div class="amount">
                      ${data_0.toLocaleString()}
                      <span>(${c_data_0.toLocaleString()})</span>
                      <div class="rate inline">${rate_0}</div>
                    </div>
                  </td>
                  <td>
                    <div class="amount">
                      ${data_1.toLocaleString()}
                      <span>(${c_data_1.toLocaleString()})</span>
                      <div class="rate inline">${rate_1}</div>
                    </div>
                  </td>
                  <td>
                    <div class="amount">
                      ${data_2.toLocaleString()}
                      <span>(${c_data_2.toLocaleString()})</span>
                      <div class="rate inline">${rate_1}</div>
                    </div>
                  </td>
                </tr>
                `;
              });
              $('#day_clinic_table_base').html(
                `
                <table id="day_clinic_table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>総合売上</th>
                      <th>来院数</th>
                      <th>新患数</th>
                    </tr>
                  </thead>
                  <tbody>${ap}</tbody>
                </table>
                `
              );
              let table = $('#day_clinic_table').DataTable({
                columnDefs:[{type:'currency',targets:[1,2]}],
                displayLength:5,
                lengthChange: false,
                searching: false,
                ordering: true,
                info: true,
                paging: true,
                order:[[1,"desc"]]
              });
            }
            const desc_staff_table = (obj) => {

              let result = obj.filter(({period}) => period == sender_data[`${st==0?`day0`:`day1`}`]);
              let c_result = obj.filter(({period}) => period == sender_data[`${st==0?`day2`:`day3`}`]);

              let ap = ``;
              result.forEach((cell) => {
                let rslt = result.filter(({obj_id}) => obj_id == cell.obj_id);
                let data_0 = rslt.sum_val('data_0');
                let data_1 = rslt.sum_val('data_1');
                let data_2 = rslt.sum_val('data_2');

                let c_rslt = c_result.filter(({obj_id}) => obj_id == cell.obj_id);
                let c_data_0 = c_rslt.sum_val('data_0');
                let c_data_1 = c_rslt.sum_val('data_1');
                let c_data_2 = c_rslt.sum_val('data_2');

                let rate_0 = data_0.to_perate(c_data_0).rate_str();
                let rate_1 = data_1.to_perate(c_data_1).rate_str();
                let rate_2 = data_2.to_perate(c_data_2).rate_str();
                ap +=
                `
                <tr>
                  <th>${user_name==MSD_smn?`担当者${cell.obj_id}`:cell.obj_name}</th>
                  <td>
                    <div class="amount">
                      ${data_0.toLocaleString()}
                      <span>(${c_data_0.toLocaleString()})</span>
                      <div class="rate inline">${rate_0}</div>
                    </div>
                  </td>
                  <td>
                    <div class="amount">
                      ${data_1.toLocaleString()}
                      <span>(${c_data_1.toLocaleString()})</span>
                      <div class="rate inline">${rate_1}</div>
                    </div>
                  </td>
                  <td>
                    <div class="amount">
                      ${data_2.toLocaleString()}
                      <span>(${c_data_2.toLocaleString()})</span>
                      <div class="rate inline">${rate_1}</div>
                    </div>
                  </td>
                </tr>
                `;
              });
              $('#day_staff_table_base').html(
                `
                <table id="day_staff_table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>総合売上</th>
                      <th>来院数</th>
                      <th>新患数</th>
                    </tr>
                  </thead>
                  <tbody>${ap}</tbody>
                </table>
                `
              );
              let table = $('#day_staff_table').DataTable({
                columnDefs:[{type:'currency',targets:[1,2]}],
                displayLength:5,
                lengthChange: false,
                searching: false,
                ordering: true,
                info: true,
                paging: true,
                order:[[1,"desc"]]
              });
            }

            desc_bar();
            desc_summary();
            desc_clinic_table(result.data.cl);
            desc_staff_table(result.data.sf);
            reloading_process = false;
            $('#day_trend_cover').fadeOut(1000);
          }
          $(document).off('input','input[name="s0_input_"]').on('input','input[name="s0_input_"]',function() {
            let index = $('input[name="s0_input_"]').index(this);
            desc__(index);
          });
          desc__(0);
        } else {
          alert(`データ通信エラー:${result.reason}`);
        }
      }
      $(document).off('click','#day_redo').on('click','#day_redo',function() {if (!reloading_process) desc_daily_content();});
      desc_daily_content();
    }
    const desc_remark = () => {
      let obj = data.trend;
      let c_obj = data.c_trend;

      let data_0 = obj.sum_val('data_0');
      let data_1 = obj.sum_val('data_1');
      let data_2 = obj.sum_val('data_2');
      let data_3 = obj.sum_val('data_3');
      let data_4 = obj.sum_val('data_4');
      let data_5 = obj.sum_val('data_5');
      let data_6 = obj.sum_val('data_6');
      let data_7 = obj.sum_val('data_7');

      let c_data_0 = c_obj.sum_val('data_0');
      let c_data_1 = c_obj.sum_val('data_1');
      let c_data_2 = c_obj.sum_val('data_2');
      let c_data_3 = c_obj.sum_val('data_3');
      let c_data_4 = c_obj.sum_val('data_4');
      let c_data_5 = c_obj.sum_val('data_5');
      let c_data_6 = c_obj.sum_val('data_6');
      let c_data_7 = c_obj.sum_val('data_7');

      let rate_0 = data_0.to_perate(c_data_0);
      let rate_1 = data_1.to_perate(c_data_1);
      let rate_2 = data_2.to_perate(c_data_2);
      let rate_3 = data_3.to_perate(c_data_3);
      let rate_4 = data_4.to_perate(c_data_4);
      let rate_5 = data_5.to_perate(c_data_5);
      let rate_6 = data_6.to_perate(c_data_6);
      let rate_7 = data_7.to_perate(c_data_7);

      let ta = [
        "総合売上",
        "保険請求額",
        "保険負担金",
        "自費売上",
        "来院数",
        "施術数",
        "月内純患数",
        "新患数"
      ];
      var col_icon = [
        `<i class='fas fa-yen-sign'></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class='fas fa-hand-holding-heart'></i>`,
        `<i class='fas fa-hands-usd'></i>`,
        `<i class='fas fa-users'></i>`,
        `<i class='fas fa-folder-open'></i>`,
        `<i class="fad fa-users"></i>`,
        `<i class='fas fa-user-friends'></i>`,
        `<i class="fas fa-user-plus"></i>`
      ];
      let ap = ``;
      for (let i = 0;i < 8;i++) {
        ap +=
        `
        <input type="radio" name="details_input_" id="details_input_${i}">
        <label for="details_input_${i}" class="inline">
          <div class="wrap">
            <div class="row_title">
              ${col_icon[i]} ${ta[i]}
              ${i == 0?`<span style="color:#bbb;font-size:.8rem;">(前月)</span>`:``}
            </div>
            <div class="contents">
              <div class="amount">
                ${eval(`data_${i}`).toLocaleString()}
                <span>(${eval(`c_data_${i}`).toLocaleString()})</span>
              </div>
              <div class="rate">${eval(`rate_${i}`)}%</div>
              <div class="bb">
                <div class="b" style="width:${eval(`rate_${i}`)}%;"></div>
              </div>
            </div>
          </div>
        </label>
        `;
      }
      $('#remarks_base').html(ap);
      $('#details_input_0').prop('checked',true);
    }
    const desc_trend = () => {
      const desc__ = (bt) => {
        let data_arr = [];
        let data_c_arr = [];

        let tpl = [];

        let fore1 = so.fore1;
        let obj = data.trend;
        let c_obj = data.c_trend;

        const desc_leveling = () => {
          pa.forEach((label,idx) => {
            tpl.push(convert_pl(label,idx,0));

            let result = obj.filter(({period}) => period == label);
            let data = result.sum_val(`data_${bt}`);

            data_arr.push(data);

            (() => {
              let c_result = c_obj[idx];
              if (c_result != undefined) {
                let c_data = c_result[`data_${bt}`];
                data_c_arr.push(c_data);
              } else {
                data_c_arr.push(null);
              }
            })();
          });
        }
        const desc_graph = () => {
          let graph_data = [{
            type:"LineWithLine",
            label:"今月",
            data:data_arr,
            backgroundColor:`rgba(54,183,235,.1)`,
            borderColor:"#36b7eb",
            borderWidth:1.5,
            pointRadius:5,
            pointBackgroundColor:"#fff",
            fill:true,
            yAxisID: "y-axis-0",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          },{
            type:"LineWithLine",
            label:"先月",
            data:data_c_arr,
            backgroundColor:`rgba(242,100,100,.05)`,
            borderColor:`rgba(242,100,100,1)`,
            borderWidth:1.5,
            pointRadius:5,
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
                  display:true,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  min:0,
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:6,
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
                  let idx = t.datasetIndex;
                  let amount = t.yLabel;
                  let ar = ["今月","比較"];
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

        desc_leveling();
        desc_graph();
      }

      $(document).off('input','input[name="details_input_"]').on('input','input[name="details_input_"]',function() {
        let index = $('input[name=details_input_]').index(this);
        desc__(index);
      });
      desc__(0);
    }
    const desc_forecast = () => {
      let fore1 = so.fore1;
      let fore2 = so.fore2;
      let pa = period_map(ps,fore2,0);
      let obj = data.forecast;
      let objs = data.cl;
      let accuracy = obj.length.to_perate((obj.length + period_map(fore1,fore2,0).length - 1)).to_Perate(1);
      let week_objs = [];

      let month_data_0 = 0;

      const desc_leveling = () => {
        for (let i = 0;i < 7;i++) {
          let result = obj.filter(({week}) => week == i);
          let data_0 = result.sum_val('data_0');
          let data_1 = result.sum_val('data_1');
          let data_2 = result.sum_val('data_2');

          let ave_0 = data_0.to_devide(result.length);
          let ave_1 = data_1.to_devide(result.length);
          let ave_2 = data_2.to_devide(result.length);

          week_objs.push({
            ave_0:ave_0,
            ave_1:ave_1,
            ave_2:ave_2
          });
        }
      }
      const desc_trend = () => {
        let achieve_arr = [];
        let forecast_arr = [];
        let forecast_up_arr = [];
        let forecast_down_arr = [];
        let tpl = [];

        const desc_leveling = () => {
          pa.forEach((label,idx) => {
            tpl.push(convert_pl(label,idx,0));

            let result = obj.filter(({period}) => period == label);
            let data_0 = result.sum_val('data_0');
            if (label <= fore1) achieve_arr.push(data_0);
            else achieve_arr.push(null);

            if (label >= fore1) {
              if (label == fore1) {
                forecast_arr.push(data_0);
                forecast_up_arr.push(data_0);
                forecast_down_arr.push(data_0);
              } else {
                let year = label.split('-')[0];
                let month = Number(label.split('-')[1]) - 1;
                let day = Number(label.split('-')[2]);
                let w = new Date(year,month,day).getDay();

                let data_0 = week_objs[Number(w)].ave_0;
                let data_up = (data_0 * (1+(100 - accuracy)/100)).to_devide(1);
                let data_down = (data_0 * (1-(100 - accuracy)/100)).to_devide(1);

                month_data_0 += data_0;
                forecast_arr.push(data_0);
                forecast_up_arr.push(data_up);
                forecast_down_arr.push(data_down);
              }
            } else {
              forecast_arr.push(null);
              forecast_up_arr.push(null);
              forecast_down_arr.push(null);
            }
          });
        }
        const desc_graph = () => {
          let graph_data = [{
            label:`実績値`,
            data:achieve_arr,
            borderColor:"rgb(18,83,164)",
            borderWidth:1.5,
            pointRadius:0,
            pointBackgroundColor:"#fff",
            fill:false,
            yAxisID: "y-axis-0",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          },{
            label:`予測推移`,
            data:forecast_arr,
            borderColor:"rgb(18,83,164)",
            borderWidth:1.5,
            pointRadius:0,
            borderDash: [5,3],
            pointBackgroundColor:"#fff",
            fill:false,
            yAxisID: "y-axis-0",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          },{
            label:`上方修正`,
            data:forecast_up_arr,
            backgroundColor: "rgba(69,165,245,.2)",
            borderColor:'rgba(69,165,245,.8)',
            borderWidth:1.5,
            pointRadius:0,
            borderDash: [4,2],
            fill:"1",
            yAxisID: "y-axis-0",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          },{
            label:`下方修正`,
            data:forecast_down_arr,
            backgroundColor:"rgba(242,100,100,.2)",
            borderColor:'rgba(242,100,100,.8)',
            borderWidth:1.5,
            pointRadius:0,
            borderDash: [4,2],
            fill:"1",
            yAxisID: "y-axis-0",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          }];
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{labels:{fontSize:10,boxWidth:12}},
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
                  mirror:true,
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
                  let idx = t.datasetIndex;
                  let amount = t.yLabel;
                  let ar = ["実績","予測推移","上方修正","下方修正"];
                  return `${ar[idx]} ${amount.toLocaleString()}`;
                }
              }
            }
          }
          forecast_line.data = {
            labels:tpl,
            datasets:graph_data
          };
          forecast_line.options = graph_option;
          forecast_line.update();
        }

        desc_leveling();
        desc_graph();
      }
      const desc_table = () => {
        $('#forecast_table_base').html(``);
        let ap = ``;

        let obj = data.forecast_obj;

        let zentai = obj.filter(({period}) => period >= ps).sum_val('data_0');
        let all_yosoku = 0;
        let accuracy_sum = 0;

        objs.forEach((cell) => {
          let result = obj.filter(({obj_id}) => obj_id == cell.obj_id);
          let obj_accuracy = result.length.to_perate((result.length + period_map(fore1,fore2,0).length - 1)).to_Perate(1);
          accuracy_sum += obj_accuracy;

          let ave_0_arr = [];
          for (let i = 0;i < 7;i++) {
            let rslt = result.filter(({week}) => week == i);
            let data_0 = rslt.sum_val('data_0');

            ave_0_arr.push(data_0.to_devide(result.length / objs.length));
          }
          let achieve_0 = result.filter(({period}) => period >= ps).sum_val('data_0');
          let forecast_0 = 0;
          pa.forEach((label) => {
            if (label > fore1) {
              let year = label.split('-')[0];
              let month = Number(label.split('-')[1]) - 1;
              let day = Number(label.split('-')[2]);
              let w = new Date(year,month,day).getDay();

              let data_0 = ave_0_arr[w];
              forecast_0 += data_0;
            }
          });

          all_yosoku += achieve_0 + forecast_0;
          ap +=
          `
          <tr>
            <th>${user_name==MSD_smn?`店舗${cell.obj_id}`: cell.obj_name}</th>
            <td>¥${achieve_0.toLocaleString()}</td>
            <td>¥${(achieve_0 + forecast_0).toLocaleString()}</td>
            <td>${obj_accuracy}%</td>
          </tr>
          `;
        });

        (() => {
          let ave_accuracy = accuracy_sum.to_Perate(objs.length);

          ap +=
          `
          <tr>
            <th>全体集計予測</th>
            <th>¥${zentai.toLocaleString()}</th>
            <th>¥${(zentai + month_data_0).toLocaleString()}</th>
            <td>${accuracy}%</td>
          </tr>
          <tr>
            <th>個別集計予測</th>
            <th>¥${zentai.toLocaleString()}</th>
            <th>¥${all_yosoku.toLocaleString()}</th>
            <td>${ave_accuracy}%</td>
          </tr>
          `;
        })();

        $('#forecast_table_base').html(
          `
          <table id="forecast_table">
            <thead>
              <tr>
                <th></th>
                <th>今月 実績値</th>
                <th>月末予測</th>
                <th>精度</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );
        let table = $('#forecast_table').DataTable({
          columnDefs:[{type:'currency',targets:[1,2]}],
          displayLength:7,
          lengthChange: false,
          searching: true,
          ordering: true,
          info: true,
          paging: true,
          order:[[2,"desc"]]
        });
      }

      desc_leveling();
      desc_trend();
      desc_table();
    }
    const desc_mission = () => {
      let mcna = ["w_a","c_a"];
      let mcda = ["円","人"];
      let missions = data.mission;
      let objs = data.trend;

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
            tpl.push(convert_pl(label,idx,0));

            let r_a = objs.filter(({period}) => period == label);
            let r_m = missions.filter(({period}) => period == label);

            let amount =
            mbt == 0
            ? r_a.sum_val(`data_2`) + r_a.sum_val(`data_3`)
            : r_a.sum_val(`data_4`);
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
                  return `${nar[index]} : ${pie_data[index]}日`;
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
          let amount =
          mbt == 0
          ? objs.sum_val(`data_2`) + objs.sum_val(`data_3`)
          : objs.sum_val(`data_4`);
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
      $(document).off('input',`input[name="s3_input_"]`).on('input','input[name="s3_input_"]',function() {
        let index = $('input[name="s3_input_"]').index(this);
        section_content(index);
      });
      section_content(0);
    }
    const desc_week = () => {
      let ps = so.pw0;
      let pe = so.pw1;
      let pa = period_map(ps,pe,1);

      let obj = data.week;
      const desc_graph = () => {
        let data_arr = [];

        let tpl = [];
        pa.forEach((label,idx) => {
          tpl.push(convert_pl(label,idx,2));

          let result = obj.filter(({period}) => period == label);
          let data = result.sum_val('data_0');
          data_arr.push(data);
        });

        let graph_data = [{
          label:"総合売上",
          data:data_arr,
          borderColor:"rgb(18,83,164)",
          borderWidth:2,
          pointRadius:0,
          fill:false,
          yAxisID: "y-axis-0",
          cubicInterpolationMode: 'monotone',
          lineTension: 0
        }];
        let graph_option = {
          maintainAspectRatio:true,
          responsive: true,
          legend:{display:false,},
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
                mirror:true,
                fontSize:8,
                maxTicksLimit:3,
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
                display:false,
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
                let idx = t.datasetIndex;
                let amount = t.yLabel;
                return `総合売上 ¥${amount.toLocaleString()}`;
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
      const desc_table = () => {
        let ap = ``;
        let na = ["総合売上","来院数","新患数"];

        for (let i = 0;i < 3;i++) {
          let app = ``;
          pa.forEach((label) => {
            let result = obj.filter(({period}) => period == label);
            let data = result.sum_val(`data_${i}`);
            app += `<td>${data.toLocaleString()}</td>`;
          });
          ap +=
          `
          <tr>
            <th>${na[i]}</th>
            ${app}
          </tr>
          `;
        }

        let tpa = ``;
        pa.forEach((label,idx) => {
          tpa += `<th>${convert_pl(label,idx,2)}</th>`;
        });
        $('#week_table_base').html(
          `
          <table style="line-height:1.5rem;">
            <thead>
              <tr>
                <th></th>
                ${tpa}
              </tr>
            </thead>
            <tbody>
              ${ap}
            </tbody>
          </table>
          `
        );
      }

      desc_graph();
      desc_table();
    }
    const desc_month = () => {
      let ps = so.pm0;
      let pe = so.pm1;
      let pa = period_map(ps,pe,2);

      let obj = data.month;
      const desc_graph = () => {
        let data_arr = [];

        let tpl = [];
        pa.forEach((label,idx) => {
          tpl.push(convert_pl(label,idx,2));

          let result = obj.filter(({period}) => period == label);
          let data = result.sum_val('data_0');
          data_arr.push(data);
        });

        let graph_data = [{
          label:"総合売上",
          data:data_arr,
          borderColor:"rgb(18,83,164)",
          borderWidth:2,
          pointRadius:0,
          fill:false,
          yAxisID: "y-axis-0",
          cubicInterpolationMode: 'monotone',
          lineTension: 0
        }];
        let graph_option = {
          maintainAspectRatio:true,
          responsive: true,
          legend:{display:false,},
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
                mirror:true,
                fontSize:8,
                maxTicksLimit:3,
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
                display:false,
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
                let idx = t.datasetIndex;
                let amount = t.yLabel;
                return `総合売上 ¥${amount.toLocaleString()}`;
              }
            }
          }
        }
        month_line.data = {
          labels:tpl,
          datasets:graph_data
        };
        month_line.options = graph_option;
        month_line.update();
      }
      const desc_table = () => {
        let ap = ``;
        let na = ["総合売上","来院数","新患数"];

        for (let i = 0;i < 3;i++) {
          let app = ``;
          pa.forEach((label) => {
            let result = obj.filter(({period}) => period == label);
            let data = result.sum_val(`data_${i}`);
            app += `<td>${data.toLocaleString()}</td>`;
          });
          ap +=
          `
          <tr>
            <th>${na[i]}</th>
            ${app}
          </tr>
          `;
        }

        let tpa = ``;
        pa.forEach((label,idx) => {
          tpa += `<th>${convert_pl(label,idx,2)}</th>`;
        });
        $('#month_table_base').html(
          `
          <table style="line-height:1.5rem;">
            <thead>
              <tr>
                <th></th>
                ${tpa}
              </tr>
            </thead>
            <tbody>
              ${ap}
            </tbody>
          </table>
          `
        );
      }

      desc_graph();
      desc_table();
    }
    const desc_customer = () => {
      let objs = data.customer;
      let obj = [
        {obj_id:0,obj_name:"未成年 男性"},
        {obj_id:1,obj_name:"未成年 女性"},
        {obj_id:2,obj_name:"20~34歳 男性"},
        {obj_id:3,obj_name:"20~34歳 女性"},
        {obj_id:4,obj_name:"35~64歳 男性"},
        {obj_id:5,obj_name:"35~64歳 女性"},
        {obj_id:6,obj_name:"前期高齢者 男性"},
        {obj_id:7,obj_name:"前期高齢者 女性"},
        {obj_id:8,obj_name:"後期高齢者 男性"},
        {obj_id:9,obj_name:"後期高齢者 女性"},
      ];

      let ap = ``;
      obj.forEach((cell) => {
        let result = objs.filter(({obj_id}) => obj_id == cell.obj_id);

        let data_0 = result.sum_val('data_0');
        let data_1 = result.sum_val('data_1');
        let data_2 = result.sum_val('data_2');

        ap +=
        `
        <tr>
          <th>${cell.obj_name}</th>
          <td>${data_0.toLocaleString()}</td>
          <td>${data_1.toLocaleString()}</td>
          <td>${data_2.toLocaleString()}</td>
        </tr>
        `;
      });
      $('#customer_table_base').html(
        `
        <table id="customer_table">
          <thead>
            <tr>
              <th></th>
              <th>総合売上</th>
              <th>来院数</th>
              <th>新患数</th>
            </tr>
          </thead>
          <tbody>${ap}</tbody>
        </table>
        `
      );
      let table = $('#customer_table').DataTable({
        columnDefs:[{type:'currency',targets:[1,2,3]}],
        displayLength:10,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: false,
        paging: false,
        order:[[1,"desc"]]
      });
    }
    const desc_map = () => {
      $('input[name="map_customer_"]').prop('checked',true);
      let cl = data.cl;
      let cuo = data.customers;

      let clinic_filter_arr = [];
      let clinic_arr = [];
      let user_arr = [];

      for (let i = 0;i < cl.length;i=(i+1)|0) {
        let cell = cl[i];
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
          addr1:cell.addr1,
          addr2:cell.addr2,
          name:`${user_name==MSD_smn?`患者${cell.c_ptno}`:cell.c_name}`,
          gender:gender_arr[cell.gender],
          age:cell.age,
          clinic_id:cell.clinic_id,
          data_0:cell.data_0
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

        for (let i = 0; i < clinic_arr.length; i++) {
          let result = cuo.filter(({clinic_id}) => clinic_id == clinic_arr[i].id);
          let data_0   =   result.sum_val(`data_0`);

          let rate_amount  =      (result.length).to_perate(amount_total);
          let rate_0       =      data_0.to_perate(sum_data_0);

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
              <div style="margin:2px;text-align:left;font-size:1rem;">${clinic_arr[i].name}</div>
              純患数 : ${result.length}人(${rate_amount}%)
              <div style="height:4px;background-color:#ddd;">
                <div style="width:${rate_amount}%;height:4px;background-color:rgba(69,165,255,1);"></div>
              </div>
              総来院数 : ${data_0.str_jp()}(${rate_0}%)
              <div style="height:4px;background-color:#ddd;">
                <div style="width:${rate_0}%;height:4px;background-color:rgba(69,165,255,1);"></div>
              </div>
              `
          });
          clinic_event(i);
        }
        if (clinic_marker.length >= 2) {
          map.fitBounds(bounds);
        }

        for (let i = 0;i < user_arr.length;i++) {
          markerLatLng = new google.maps.LatLng({lat: user_arr[i].lat, lng: user_arr[i].lng});

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
              ${user_arr[i].gender} ${user_arr[i].age}歳
              <br>
              店舗:${clinic_name.name}
              <br>
              来院数:${user_arr[i].data_0.str_jp()}回
            `
          });

          let unm = 0;
          let num = 0;
          if (user_arr[i].data_0 == 1) {
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
          } else if (user_arr[i].data_0 >= 2 && user_arr[i].data_0 <= 5) {
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

      $(document).off('click','input[name="map_customer_"]').on('click','input[name="map_customer_"]',function() {
        redesc_filted_user();
      });

      const desc_map_view = () => {
        desc_map();
        redesc_filted_user();
      }
      desc_map_view();
    }
    const desc_left = () => {
      let p7 = so.p7;
      let objs = data.left;
      let ap = ``;
      objs.forEach((cell) => {
        let name = cell.c_name;
        let gender = cell.gender;
        let age = cell.age;

        ap +=
        `
        <tr>
          <th>
            <a href="customer?cid=${cell.clinic_id}&ptno=${cell.ptno}&cname=${cell.c_name}" target="_blank">
              ${user_name==MSD_smn?`患者${cell.c_ptno}`: cell.c_name}
            </a>
          </th>
          <td>${gender_arr[gender]}</td>
          <td>${age}歳</td>
        </tr>
        `;
      });
      $('#left_table_base').html(
        `
        <table id="left_table">
          <thead>
            <tr>
              <th></th>
              <th>性別</th>
              <th>年齢</th>
            </tr>
          </thead>
          <tbody>${ap}</tbody>
        </table>
        `
      );
      let table = $('#left_table').DataTable({
        displayLength:10,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        paging: true,
        order:[[1,"desc"]]
      });

      $(document).off('click','#left_customer').on('click','#left_customer',function() {
        if (objs.length == 0) {alert('該当する顧客がいないので、出力をキャンセルしました。');return;}

        let today = new Date();
        let ap = ``;

        objs.forEach((cell) => {
          ap +=
          `
          <tr>
            <th>${user_name==MSD_smn?`患者${cell.c_ptno}`:cell.cname}</th>
            <th>${user_name==MSD_smn?`カンジャ${cell.c_ptno}`:cell.ckana}</th>
            <th>${cell.clinic_name}</th>
            <th>${cell.tel}</th>
            <th>${cell.mobile}</th>
            <th>${cell.email}</th>
            <th>${cell.postcd}</th>
            <th>${cell.addr1}</th>
            <th>${cell.addr2}</th>
            <td>${gender_arr[cell.gender]}</td>
            <td>${cell.birthday.str_date(`-`)}</td>
            <td>${cell.age}歳</td>
            <td>${cell.last_sdate.str_date(`-`)}</td>
          </tr>
          `;
        });

        $('#download_table_base').html(
          `
          <tr>
            <th>名前</th>
            <th>かな</th>
            <th>院</th>
            <th>電話番号</th>
            <th>携帯電話</th>
            <th>eメール</th>
            <th>郵便番号</th>
            <th>住所1</th>
            <th>住所2</th>
            <th>性別</th>
            <th>誕生日</th>
            <th>年齢</th>
            <th>最終来院日</th>
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
        }), `${p7.str_date(`.`)}が最終来院日の顧客一覧${today.dD().str_date(`-`)}.xlsx`);
      });
    }
    const desc_clinic = () => {
      let objs = data.cl;

      let ap = ``;
      objs.forEach((cell) => {
        let name = cell.obj_name;
        let data_0 = cell.data_0;
        let data_1 = cell.data_1;
        let data_2 = cell.data_2;

        ap +=
        `
        <tr>
          <th>
            <a href="/achieve_analytics?st=1&ss=true&si=${cell.obj_id}&pt=0&psel=true&ps=${ps}&pe=${pe}">
              ${user_name==MSD_smn?`店舗${cell.obj_id}`: cell.obj_name}
            </a>
          </th>
          <td>${data_0.toLocaleString()}</td>
          <td>${data_1.toLocaleString()}</td>
          <td>${data_2.toLocaleString()}</td>
        </tr>
        `;
      });
      $('#clinic_table_base').html(
        `
        <table id="clinic_table">
          <thead>
            <tr>
              <th></th>
              <th>総合売上</th>
              <th>来院数</th>
              <th>新患数</th>
            </tr>
          </thead>
          <tbody>${ap}</tbody>
        </table>
        `
      );
      let table = $('#clinic_table').DataTable({
        columnDefs:[{type:'currency',targets:[1,2,3]}],
        displayLength:5,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        paging: true,
        order:[[1,"desc"]]
      });
    }
    const desc_staff = () => {
      let objs = data.sf;

      let ap = ``;
      objs.forEach((cell) => {
        let name = cell.obj_name;
        let data_0 = cell.data_0;
        let data_1 = cell.data_1;
        let data_2 = cell.data_2;

        ap +=
        `
        <tr>
          <th>
            <a href="/achieve_analytics?st=2&ss=true&si=${cell.obj_id}&pt=0&psel=true&ps=${ps}&pe=${pe}">
              ${user_name==MSD_smn?`担当者${cell.obj_id}`: cell.obj_name}
            </a>
          </th>
          <td>${data_0.toLocaleString()}</td>
          <td>${data_1.toLocaleString()}</td>
          <td>${data_2.toLocaleString()}</td>
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
              <th>来院数</th>
              <th>新患数</th>
            </tr>
          </thead>
          <tbody>${ap}</tbody>
        </table>
        `
      );
      let table = $('#staff_table').DataTable({
        columnDefs:[{type:'currency',targets:[1,2,3]}],
        displayLength:5,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        paging: true,
        order:[[1,"desc"]]
      });
    }
    const desc_cate = () => {
      let objs = data.ct;
      let obj = [
        {obj_id:1,obj_name:"自費施術"},
        {obj_id:2,obj_name:"物販"},
        {obj_id:11,obj_name:"柔整"},
        {obj_id:12,obj_name:"鍼灸"},
        {obj_id:13,obj_name:"マッサージ"},
        {obj_id:14,obj_name:"自賠責"},
        {obj_id:15,obj_name:"労災"},
        {obj_id:16,obj_name:"生活保護"}
      ];

      let ap = ``;
      obj.forEach((cell) => {
        let result = objs.filter(({obj_id}) => obj_id == cell.obj_id);

        let data_0 = result.sum_val('data_0');
        let data_1 = result.sum_val('data_1');
        let data_2 = result.sum_val('data_2');

        ap +=
        `
        <tr>
          <th>${cell.obj_name}</th>
          <td>${data_0.toLocaleString()}</td>
          <td>${data_1.toLocaleString()}</td>
          <td>${data_2.toLocaleString()}</td>
        </tr>
        `;
      });
      $('#cate_table_base').html(
        `
        <table id="cate_table">
          <thead>
            <tr>
              <th></th>
              <th>総合売上</th>
              <th>窓口売上</th>
              <th>来院数</th>
            </tr>
          </thead>
          <tbody>${ap}</tbody>
        </table>
        `
      );
      let table = $('#cate_table').DataTable({
        columnDefs:[{type:'currency',targets:[1,2,3]}],
        displayLength:10,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: false,
        paging: false,
        order:[[1,"desc"]]
      });
    }
    const desc_keyword = () => {
      let objs = data.ky;
      let ap = ``;
      objs.forEach((cell) => {
        let name = cell.obj_name;
        let data_0 = cell.data_0;
        let data_1 = cell.data_1;
        let data_2 = cell.data_2;

        ap +=
        `
        <tr>
          <th>
            <a href="/achieve_analytics?psel=true&ps=${ps}&pe=${pe}&bt=3&mt=3&ms=true&mi=${cell.obj_id}">${cell.obj_name}</a>
          </th>
          <td>${data_0.toLocaleString()}</td>
          <td>${data_1.toLocaleString()}</td>
          <td>${data_2.toLocaleString()}</td>
        </tr>
        `;
      });
      $('#keyword_table_base').html(
        `
        <table id="keyword_table">
          <thead>
            <tr>
              <th></th>
              <th>総合売上</th>
              <th>来院数</th>
              <th>新患数</th>
            </tr>
          </thead>
          <tbody>${ap}</tbody>
        </table>
        `
      );
      let table = $('#keyword_table').DataTable({
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
    const desc_coupon = () => {
      let objs = data.cp;
      let ap = ``;
      objs.forEach((cell) => {
        let name = cell.obj_name;
        let data_0 = cell.data_0;
        let data_1 = cell.data_1;

        ap +=
        `
        <tr>
          <th>
            <a href="/achieve_analytics?psel=true&ps=${ps}&pe=${pe}&bt=3&mt=4&ms=true&mi=${cell.obj_id}">${cell.obj_name}</a>
          </th>
          <td>${data_0.toLocaleString()}</td>
          <td>${data_1.toLocaleString()}</td>
        </tr>
        `;
      });
      $('#coupon_table_base').html(
        `
        <table id="coupon_table">
          <thead>
            <tr>
              <th></th>
              <th>回数</th>
              <th>金額</th>
            </tr>
          </thead>
          <tbody>${ap}</tbody>
        </table>
        `
      );
      let table = $('#coupon_table').DataTable({
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
    const desc_count = () => {
      const desc_line = () => {
        let data_0_arr = [];
        let data_1_arr = [];

        let tpl = [];
        let obj = data.count;
        for (let i = 0;i < 10;i++) {
          tpl.push(`${i}回`);

          let result = obj.filter(({count_num}) => count_num == i+1);
          let data_0 = result.sum_val('data_0');
          let data_1 = result.sum_val('data_1');

          data_0_arr.push(data_0);
          data_1_arr.push(data_1);
        }

        let graph_data = [{
          type:"LineWithLine",
          label:"人数",
          data:data_1_arr,
          borderColor:"rgba(54,100,180,1)",
          borderWidth:1.5,
          pointRadius:5,
          pointBackgroundColor:"#fff",
          fill:false,
          yAxisID: "y-axis-0",
          cubicInterpolationMode: 'monotone',
          lineTension: 0
        },{
          label:"総合売上",
          data:data_0_arr,
          backgroundColor:"rgba(255,165,0,.1)",
          borderColor:"rgba(255,165,0,1)",
          borderWidth:1,
          yAxisID: "y-axis-1",
          cubicInterpolationMode: 'monotone',
          lineTension: 0
        }];
        let graph_option = {
          maintainAspectRatio:true,
          responsive: true,
          legend:{labels:{fontSize:10,boxWidth:24}},
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
                mirror:true,
                fontSize:8,
                maxTicksLimit:3,
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
                zeroLineColor:"#eee",
                color:"#eee"
              },
              ticks: {
                min:0,
                autoSkip: true,
                mirror:true,
                fontSize:8,
                maxTicksLimit:3,
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
                display:false,
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
                return `${index+1}回`;
              },
              label:function(t,d) {
                let idx = t.datasetIndex;
                let amount = t.yLabel;
                let ar = ["継続人数","総合売上"];
                return `${ar[idx]} ${amount.toLocaleString()}`;
              }
            }
          }
        }
        count_line.data = {
          labels:tpl,
          datasets:graph_data
        };
        count_line.options = graph_option;
        count_line.update();
      }
      const desc_table = () => {
        let ap = ``;

        let obj = data.count;
        (() => {
          let app = ``;
          for (let i = 0;i < 10;i++) {
            let result = obj.filter(({count_num}) => count_num == i+1);
            let data = result.sum_val('data_1');
            app += `<td>${data.toLocaleString()}</td>`;
          }
          ap += `<tr><th>総人数</th>${app}</tr>`;
        })();
        (() => {
          let app = ``;
          for (let i = 0;i < 10;i++) {
            let result = obj.filter(({count_num}) => count_num == i+2);
            let data = result.sum_val('data_1');
            if (i == 8 || i == 9) {
              app += `<th>--</th>`;
            } else {
              app += `<td>${data.toLocaleString()}</td>`;
            }
          }
          ap += `<tr><th>継続数</th>${app.toLocaleString()}</tr>`;
        })();
        (() => {
          let app = ``;
          for (let i = 0;i < 10;i++) {
            let result_0 = obj.filter(({count_num}) => count_num == i+1);
            let result_1 = obj.filter(({count_num}) => count_num == i+2);
            let data_0 = result_0.sum_val('data_1');
            let data_1 = result_1.sum_val('data_1');
            if (i == 8 || i == 9) {
              app += `<th>--</th>`;
            } else {
              app += `<td>${(data_0 - data_1).toLocaleString()}</td>`;
            }
          }
          ap += `<tr><th>離脱数</th>${app.toLocaleString()}</tr>`;
        })();
        (() => {
          ap += `<tr><th colspan="11"></th></tr>`;
        })();
        (() => {
          let app = ``;
          for (let i = 0;i < 10;i++) {
            let result = obj.filter(({count_num}) => count_num == i+2);
            let data = result.sum_val('data_0');
            app += `<td>${data.toLocaleString()}</td>`;
          }
          ap += `<tr><th>総売</th>${app}</tr>`;
        })();

        $('#count_table_base').html(
          `
          <table id="count_table">
            <thead>
              <tr>
                <th></th>
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

      desc_line();
      desc_table();
    }

    setTimeout(() => {
      desc_day();
    },1000);
    desc_remark();
    desc_trend();
    desc_forecast();
    desc_mission();
    desc_week();
    desc_month();
    desc_customer();
    desc_left();
    desc_clinic();
    desc_staff();
    desc_cate();
    desc_keyword();
    desc_coupon();
    desc_count();

    $(document).off('click','#open_map').on('click','#open_map',function() {
      $('._map_ .cover').hide();
      desc_map();
    });
    $('._map_ .cover').show();
  }

  desc_content_leveling();
  const desc_graph_init = (sender1,sender2,sender3,sender4) => {
    eval(`try {${sender1}.destroy();} catch(err) {}`);
    eval(`${sender2}.canvas.height = 100;`);
    eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
  }


  let day_bar;
  let trend_line;
  let forecast_line;
  let mission_line;
  let week_line;
  let month_line;
  let mission_pie;
  let count_line;

  let day_bar_ctx = document.getElementById('day_bar').getContext('2d');
  desc_graph_init("day_bar","day_bar_ctx",'bar');
  let trend_line_ctx = document.getElementById('trend_line').getContext('2d');
  desc_graph_init("trend_line","trend_line_ctx",'LineWithLine');
  let forecast_line_ctx = document.getElementById('forecast_line').getContext('2d');
  desc_graph_init("forecast_line","forecast_line_ctx",'LineWithLine');
  let mission_line_ctx = document.getElementById('mission_line').getContext('2d');
  desc_graph_init("mission_line","mission_line_ctx",'bar');
  let week_line_ctx = document.getElementById('week_line').getContext('2d');
  desc_graph_init("week_line","week_line_ctx",'LineWithLine');
  let month_line_ctx = document.getElementById('month_line').getContext('2d');
  desc_graph_init("month_line","month_line_ctx",'LineWithLine');
  let mission_pie_ctx = document.getElementById('mission_pie').getContext('2d');
  desc_graph_init("mission_pie","mission_pie_ctx",'pie');
  let count_line_ctx = document.getElementById('count_line').getContext('2d');
  desc_graph_init("count_line","count_line_ctx",'bar');

  desc_static_sections();
}
var query_function = async () => {
  let today = new Date();

  let ps = `${today.dMS().dD()}`;
  let pe = `${today.dD()}`;
  let p7 = `${today.aD(-7).dD()}`;

  let fore0 = `${today.aD(-30).dD()}`;
  let fore1 = `${today.aD(-1).dD()}`;
  let fore2 = `${today.aD(-1).dME().dD()}`;

  let cps = `${today.aM(-1).dMS().dD()}`;
  let cpe = `${today.aM(-1).dME().dD()}`;

  let pw0 = `${today.aD(-7*6).dD()}`;
  let pw1 = `${today.dD()}`;

  let pm0 = `${today.aM(-6).dMS().dD()}`;
  let pm1 = `${today.dD()}`;

  const sender_data = {
    ps:ps,
    pe:pe,
    cps:cps,
    cpe:cpe,
    p7:p7,
    fore0:fore0,
    fore1:fore1,
    fore2:fore2,
    pw0:pw0,
    pw1:pw1,
    pm0:pm0,
    pm1:pm1
  }

  let result = await ajax_api_function("summary",sender_data);
  if (result.dataExists) {
    desc_function(result.data,sender_data);
  } else {
    alert(`データ通信エラー:${result.reason}`);
  }
}

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);

  $(document).ready(async function(){
    $('.left_bar_base a:eq(0) .cell').addClass('selected');

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
      await query_function();
    }
    desc_init();
  });
}
