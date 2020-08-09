var user_name = getDOM('user_name').value;

var desc_function = (data) => {
  const desc_content_leveling = () => {
    $('#content_base').html(
      `
      <div class="section">
        <div class="section_title">検索結果 ...${data.data.length}件</div>
        <div class="cells_box">
          <div class="cell cell_13x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">サマリ</div>
              <div class="content _bar_box_">
                <div class="base" id="summary_base">
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_13x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">男女別</div>
              <div class="content _amount_box_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="gender_bar" width="200" height="100"></canvas>
                  </div>
                  <div class="table_base table_base2" id="gender_table_base"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_13x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">世代別</div>
              <div class="content _amount_box_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="generation_bar" width="200" height="100"></canvas>
                  </div>
                  <div class="table_base table_base1" id="generation_table_base"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_4x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">顧客一覧</div>
              <div class="content _segment_">
                <div class="btn_base">
                  <button class="inline" id="excel_download">
                    <i class="fas fa-file-excel"></i>
                    顧客一覧.xlsx
                  </button>
                </div>
                <div class="table_base">
                  <table id="customer_table">
                  </table>
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
    const desc_summary = () => {
      let obj = data.data;
      let at0 = obj.length;
      let at1 = obj.sum_val('data_0');
      let at2 = obj.sum_val('data_1');
      let at3 = obj.sum_val('data_2');
      let at4 = obj.sum_val('data_3');
      let at5 = obj.sum_val('count').to_Perate(obj.length);
      let at6 = obj.sum_val('data_0').to_devide(obj.sum_val('count'));


      $('#summary_base').html(
        `
        <div class="row">
          <div class="indi">合計患者数</div>
          <div class="content">
            <div class="amount">${at0.toLocaleString()}人</div>
          </div>
        </div>
        <div class="row">
          <div class="indi">総合売上</div>
          <div class="content">
            <div class="amount">¥${at1.toLocaleString()}</div>
          </div>
        </div>
        <div class="row">
          <div class="indi">保険請求額</div>
          <div class="content">
            <div class="amount">¥${at2.toLocaleString()}</div>
          </div>
        </div>
        <div class="row">
          <div class="indi">保険負担金</div>
          <div class="content">
            <div class="amount">¥${at3.toLocaleString()}</div>
          </div>
        </div>
        <div class="row">
          <div class="indi">自費売上</div>
          <div class="content">
            <div class="amount">¥${at4.toLocaleString()}</div>
          </div>
        </div>
        <div class="row">
          <div class="indi">平均来院数</div>
          <div class="content">
            <div class="amount">${at5.toLocaleString()}回</div>
          </div>
        </div>
        <div class="row">
          <div class="indi">客単価</div>
          <div class="content">
            <div class="amount">¥${at6.toLocaleString()}</div>
          </div>
        </div>
        `
      );
    }
    const desc_gender = () => {
      let male = data.data.filter(({gender}) => gender == 1);
      let female = data.data.filter(({gender}) => gender == 2);

      const desc_bar = () => {
        let data_arr = [male.length,female.length];
        let data_count_arr = [male.sum_val('count'),female.sum_val('count')];
        let data_cup_arr = [
          male.sum_val('data_0').to_Perate(male.sum_val('count')),
          female.sum_val('data_0').to_Perate(female.sum_val('count'))
        ];

        let graph_data = [{
          label:"人数",
          data:data_arr,
          backgroundColor:[`rgba(54,100,180,1)`,`rgba(242,100,100,1)`],
          borderColor: "",
          borderWidth:0,
          yAxisID: "y-axis-0",
        },{
          label:"来院数",
          data:data_count_arr,
          backgroundColor:[`rgba(54,100,180,.75)`,`rgba(242,100,100,.75)`],
          borderColor: "",
          borderWidth:0,
          yAxisID: "y-axis-0",
        },{
          label:"客単価",
          data:data_cup_arr,
          backgroundColor:`rgba(255,200,0,1)`,
          borderColor: "",
          borderWidth:0,
          yAxisID: "y-axis-1",
        }];
        let graph_option = {
          maintainAspectRatio: true,
          responsive: true,
          legend: {
            display: true,
            labels:{
              boxWidth:24,
              fontSize:8
            }
          },
          title: {display:false},
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
                maxTicksLimit: 4,
                fontSize:10,
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
                maxTicksLimit: 3,
                fontSize:10,
                callback: function(label, index, labels) {
                  return label.str_jp();
                }
              },
            }],
            xAxes: [{
              barPercentage: 1,
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
                let index = t[0].index;
                let dlna = ["男性","女性"];
                return dlna[index];
              },
              label:function(t,d) {
                let index = t.index;
                let idx = t.datasetIndex;
                let dlna = ["人数","合計来院数","総売客単価"];
                return `${dlna[idx]} : ${t.yLabel.str_jp()}`;
              }
            }
          }
        }
        gender_bar.data = {
          labels:["男性","女性"],
          datasets:graph_data,
        };
        gender_bar.options = graph_option;
        gender_bar.update();
      }
      const desc_table = () => {
        let ap = ``;

        let sum_amount = data.data.length;
        let sum_data_0 = data.data.sum_val('data_0');

        (() => {
          let rate = male.length.to_perate(sum_amount);
          let data_0 = male.sum_val('data_0');
          let rate_0 = data_0.to_perate(sum_data_0);

          let cuc = male.sum_val('count').to_Perate(male.length);
          let cup = data_0.to_Perate(male.sum_val('count'));

          ap +=
          `
          <tr>
            <th>男性</th>
            <td>
              ${male.length}人
              <div class="amount">
                <span class="percent">${rate}%</span>
              </div>
              <div class="bb" style="width:${rate}%;"></div>
            </td>
            <td>${cuc}回</td>
            <td>
              ${data_0.str_jp()}
              <div class="amount">
                <span class="percent">${rate_0}%</span>
              </div>
              <div class="bb" style="width:${rate_0}%;"></div>
            </td>
            <td>${cup.str_jp()}</td>
          </tr>
          `;
        })();
        (() => {
          let rate = female.length.to_perate(sum_amount);
          let data_0 = female.sum_val('data_0');
          let rate_0 = data_0.to_perate(sum_data_0);

          let cuc = female.sum_val('count').to_Perate(female.length);
          let cup = data_0.to_Perate(female.sum_val('count'));

          ap +=
          `
          <tr>
            <th>女性</th>
            <td>
              ${female.length}人
              <div class="amount">
                <span class="percent">${rate}%</span>
              </div>
              <div class="bb" style="width:${rate}%;"></div>
            </td>
            <td>${cuc}回</td>
            <td>
              ${data_0.str_jp()}
              <div class="amount">
                <span class="percent">${rate_0}%</span>
              </div>
              <div class="bb" style="width:${rate_0}%;"></div>
            </td>
            <td>${cup.str_jp()}</td>
          </tr>
          `;
        })();


        $('#gender_table_base').html(
          `
          <table id="gender_table">
            <thead>
              <tr>
                <th></th>
                <th>人数</th>
                <th>平均来院数</th>
                <th>総合売上</th>
                <th>総売客単</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );
      }

      desc_bar();
      desc_table();
    }
    const desc_generation = () => {
      let generation_0 = data.data.filter(({age}) => age <= 19);
      let generation_1 = data.data.filter(({age}) => age >= 20 && age <= 34);
      let generation_2 = data.data.filter(({age}) => age >= 35 && age <= 64);
      let generation_3 = data.data.filter(({age}) => age >= 65 && age <= 74);
      let generation_4 = data.data.filter(({age}) => age >= 75);

      const desc_bar = () => {
        let data_arr = [
          generation_0.length,
          generation_1.length,
          generation_2.length,
          generation_3.length,
          generation_4.length
        ];
        let data_count_arr = [
          generation_0.sum_val('count'),
          generation_1.sum_val('count'),
          generation_2.sum_val('count'),
          generation_3.sum_val('count'),
          generation_4.sum_val('count')
        ];

        let data_cup_arr = [
          generation_0.sum_val('data_0').to_Perate(generation_0.sum_val('count')),
          generation_1.sum_val('data_0').to_Perate(generation_1.sum_val('count')),
          generation_2.sum_val('data_0').to_Perate(generation_2.sum_val('count')),
          generation_3.sum_val('data_0').to_Perate(generation_3.sum_val('count')),
          generation_4.sum_val('data_0').to_Perate(generation_4.sum_val('count'))
        ];

        let graph_data = [{
          label:"人数",
          data:data_arr,
          backgroundColor:`rgba(54,100,180,1)`,
          borderColor: "",
          borderWidth:0,
          yAxisID: "y-axis-0",
        },{
          label:"来院数",
          data:data_count_arr,
          backgroundColor:`rgba(54,100,180,.75)`,
          borderColor: "",
          borderWidth:0,
          yAxisID: "y-axis-0",
        },{
          label:"客単価",
          data:data_cup_arr,
          backgroundColor:`rgba(255,200,0,1)`,
          borderColor: "",
          borderWidth:0,
          yAxisID: "y-axis-1",
        }];
        let graph_option = {
          maintainAspectRatio: true,
          responsive: true,
          legend: {
            display: true,
            labels:{
              boxWidth:24,
              fontSize:8
            }
          },
          title: {display:false},
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
                maxTicksLimit: 4,
                fontSize:10,
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
                maxTicksLimit: 3,
                fontSize:10,
                callback: function(label, index, labels) {
                  return label.str_jp();
                }
              },
            }],
            xAxes: [{
              barPercentage: 1,
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
                let index = t[0].index;
                let dlna = ["未成年","20~34歳","35~64歳","65~74歳","75歳~"];
                return dlna[index];
              },
              label:function(t,d) {
                let index = t.index;
                let idx = t.datasetIndex;
                let dlna = ["人数","合計来院数","総売客単価"];
                return `${dlna[idx]} : ${t.yLabel.str_jp()}`;
              }
            }
          }
        }
        generation_bar.data = {
           labels:["未成年","20~34歳","35~64歳","65~74歳","75歳~"],
          datasets:graph_data,
        };
        generation_bar.options = graph_option;
        generation_bar.update();
      }
      const desc_table = () => {
        let ap = ``;

        let sum_amount = data.data.length;
        let sum_data_0 = data.data.sum_val('data_0');

        (() => {
          let rate = generation_0.length.to_perate(sum_amount);
          let data_0 = generation_0.sum_val('data_0');
          let rate_0 = data_0.to_perate(sum_data_0);

          let cuc = generation_0.sum_val('count').to_Perate(generation_0.length);
          let cup = data_0.to_Perate(generation_0.sum_val('count'));

          ap +=
          `
          <tr>
            <th>~19歳</th>
            <td>
              ${generation_0.length}人
              <div class="amount">
                <span class="percent">${rate}%</span>
              </div>
              <div class="bb" style="width:${rate}%;"></div>
            </td>
            <td>${cuc}回</td>
            <td>
              ${data_0.str_jp()}
              <div class="amount">
                <span class="percent">${rate_0}%</span>
              </div>
              <div class="bb" style="width:${rate_0}%;"></div>
            </td>
            <td>${cup.str_jp()}</td>
          </tr>
          `;
        })();
        (() => {
          let rate = generation_1.length.to_perate(sum_amount);
          let data_0 = generation_1.sum_val('data_0');
          let rate_0 = data_0.to_perate(sum_data_0);

          let cuc = generation_1.sum_val('count').to_Perate(generation_1.length);
          let cup = data_0.to_Perate(generation_0.sum_val('count'));

          ap +=
          `
          <tr>
            <th>20~34歳</th>
            <td>
              ${generation_1.length}人
              <div class="amount">
                <span class="percent">${rate}%</span>
              </div>
              <div class="bb" style="width:${rate}%;"></div>
            </td>
            <td>${cuc}回</td>
            <td>
              ${data_0.str_jp()}
              <div class="amount">
                <span class="percent">${rate_0}%</span>
              </div>
              <div class="bb" style="width:${rate_0}%;"></div>
            </td>
            <td>${cup.str_jp()}</td>
          </tr>
          `;
        })();
        (() => {
          let rate = generation_2.length.to_perate(sum_amount);
          let data_0 = generation_2.sum_val('data_0');
          let rate_0 = data_0.to_perate(sum_data_0);

          let cuc = generation_2.sum_val('count').to_Perate(generation_2.length);
          let cup = data_0.to_Perate(generation_2.sum_val('count'));

          ap +=
          `
          <tr>
            <th>35~64歳</th>
            <td>
              ${generation_2.length}人
              <div class="amount">
                <span class="percent">${rate}%</span>
              </div>
              <div class="bb" style="width:${rate}%;"></div>
            </td>
            <td>${cuc}回</td>
            <td>
              ${data_0.str_jp()}
              <div class="amount">
                <span class="percent">${rate_0}%</span>
              </div>
              <div class="bb" style="width:${rate_0}%;"></div>
            </td>
            <td>${cup.str_jp()}</td>
          </tr>
          `;
        })();
        (() => {
          let rate = generation_3.length.to_perate(sum_amount);
          let data_0 = generation_3.sum_val('data_0');
          let rate_0 = data_0.to_perate(sum_data_0);

          let cuc = generation_3.sum_val('count').to_Perate(generation_3.length);
          let cup = data_0.to_Perate(generation_3.sum_val('count'));

          ap +=
          `
          <tr>
            <th>65~74歳</th>
            <td>
              ${generation_3.length}人
              <div class="amount">
                <span class="percent">${rate}%</span>
              </div>
              <div class="bb" style="width:${rate}%;"></div>
            </td>
            <td>${cuc}回</td>
            <td>
              ${data_0.str_jp()}
              <div class="amount">
                <span class="percent">${rate_0}%</span>
              </div>
              <div class="bb" style="width:${rate_0}%;"></div>
            </td>
            <td>${cup.str_jp()}</td>
          </tr>
          `;
        })();
        (() => {
          let rate = generation_4.length.to_perate(sum_amount);
          let data_0 = generation_4.sum_val('data_0');
          let rate_0 = data_0.to_perate(sum_data_0);

          let cuc = generation_4.sum_val('count').to_Perate(generation_4.length);
          let cup = data_0.to_Perate(generation_4.sum_val('count'));

          ap +=
          `
          <tr>
            <th>65~74歳</th>
            <td>
              ${generation_4.length}人
              <div class="amount">
                <span class="percent">${rate}%</span>
              </div>
              <div class="bb" style="width:${rate}%;"></div>
            </td>
            <td>${cuc}回</td>
            <td>
              ${data_0.str_jp()}
              <div class="amount">
                <span class="percent">${rate_0}%</span>
              </div>
              <div class="bb" style="width:${rate_0}%;"></div>
            </td>
            <td>${cup.str_jp()}</td>
          </tr>
          `;
        })();

        $('#generation_table_base').html(
          `
          <table id="generation_table">
            <thead>
              <tr>
                <th></th>
                <th>人数</th>
                <th>平均来院数</th>
                <th>総合売上</th>
                <th>総売客単</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );
      }

      desc_bar();
      desc_table();
    }
    const desc_table = () => {
      let gender = ["","男性","女性"];
      let ap = ``;
      let obj = data.data;

      obj.forEach((cell) => {
        ap +=
        `
        <tr>
          <th><a href="/customer?cid=${cell.clinic_id}&ptno=${cell.ptno}&cname=${cell.cname}" target="_blank">${user_name==MSD_smn?`患者${cell.c_ptno}`: cell.cname}</a></th>
          <th>${user_name==MSD_smn?`店舗${cell.clinic_id}`: cell.clinic_name}</th>
          <th>${cell.tel}</th>
          <td>${gender[cell.gender]}</td>
          <td>${cell.age}歳</td>
          <td>${cell.count.toLocaleString()}</td>
          <td>${cell.data_0.toLocaleString()}</td>
          <td>${cell.data_1.toLocaleString()}</td>
          <td>${cell.data_2.toLocaleString()}</td>
          <td>${cell.data_3.toLocaleString()}</td>
          <td>${cell.last_sdate.str_date(`.`)}</td>
        </tr>
        `;
      });
      $('#customer_table').html(
        `
        <thead>
          <tr>
            <th></th>
            <th>通院店舗</th>
            <th>電話番号</th>
            <th>性別</th>
            <th>年齢</th>
            <th>来院回数</th>
            <th>総合売上</th>
            <th>保険請求額</th>
            <th>保険負担金</th>
            <th>自費金額</th>
            <th>最終来院日</th>
          </tr>
        </thead>
        <tbody>${ap}</tbody>
        `
      );
      let table = $('#customer_table').DataTable({
        columnDefs:[{type:'currency',targets:[4,5,6,7,8,9,10]}],
        displayLength:20,
        lengthMenu: [10,20,30,40,50],
        lengthChange:true,
        searching: true,
        ordering: true,
        info: false,
        paging: true,
        order:[[0,"asc"]]
      });

      $(document).off('click','#excel_download').on('click','#excel_download',function() {
        if (data.length == 0) {alert('該当する顧客がいないので、出力をキャンセルしました。');return;}

        let filter_str = ``;
        (() => {
          let ar = ["性別","年齢","名前","電話番号","誕生月","来院回数","来院期間1","来院期間2","離反期間1","離反期間2","最終来院日","通院店舗","施術担当","総合売上","保険請求額","保険負担金","自費金額"];
          for (let i = 0;i < 16;i++) {
            let bool = $(`#fs_${i}`).prop('checked');
            if (bool) {
              filter_str += `${ar[i]}:`;

              if (i == 0) {
                let gi = $('input[name="filter_gender_"]:checked').prop('value');
                filter_str += `${gender[gi]},`;
              } else if (i == 1) {
                let s = $('#filter_age_0').prop('value');
                let e = $('#filter_age_1').prop('value');
                filter_str += `${s}~${e}歳,`;
              } else if (i == 2) {
                let name = $('#filter_name_0').prop('value');
                filter_str += `${name},`;
              } else if (i == 3) {
                let kw = $('#filter_phone_0').prop('value');
                filter_str += `${kw},`;
              } else if (i == 4) {
                let kw = $('#filter_birth_0 option:selected').html();
                filter_str += `${kw},`;
              } else if (i == 5) {
                let count = $('#filter_count_0').prop('value');
                filter_str += `${count}回以上,`;
              } else if (i == 6) {
                let s = $('#filter_in1_0').prop('value');
                let e = $('#filter_in1_1').prop('value');
                filter_str += `${s.str_date(`.`)}~${e.str_date(`.`)},`;
              } else if (i == 7) {
                let s = $('#filter_in2_0').prop('value');
                let e = $('#filter_in2_1').prop('value');
                filter_str += `${s.str_date(`.`)}~${e.str_date(`.`)},`;
              } else if (i == 8) {
                let s = $('#filter_left1_0').prop('value');
                let e = $('#filter_left1_1').prop('value');
                filter_str += `${s.str_date(`.`)}~${e.str_date(`.`)},`;
              } else if (i == 9) {
                let s = $('#filter_left2_0').prop('value');
                let e = $('#filter_left2_1').prop('value');
                filter_str += `${s.str_date(`.`)}~${e.str_date(`.`)},`;
              } else if (i == 10) {
                let count = $('#filter_last_0').prop('value');
                filter_str += `${count.str_date(`.`)}以降来院なし,`;
              } else if (i == 11) {
                let name = $('#filter_clinic_0 option:selected').html();
                filter_str += `${name},`;
              } else if (i == 12) {
                let name = $('#filter_staff_0 option:selected').html();
                filter_str += `${name},`;
              } else if (i == 13) {
                let s = $('#filter_hoken_0').prop('value');
                let e = $('#filter_hoken_1').prop('value');
                filter_str += `${s}~${e},`;
              } else if (i == 14) {
                let s = $('#filter_hutan_0').prop('value');
                let e = $('#filter_hutan_1').prop('value');
                filter_str += `${s}~${e},`;
              } else if (i == 15) {
                let s = $('#filter_jihi_0').prop('value');
                let e = $('#filter_jihi_1').prop('value');
                filter_str += `${s}~${e},`;
              } else if (i == 16) {
                let s = $('#filter_jihi_0').prop('value');
                let e = $('#filter_jihi_1').prop('value');
                filter_str += `${s}~${e},`;
              }
            }
          }
        })();

        let today = new Date();
        let ap = ``;
        data.data.forEach((cell) => {
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
            <td>${gender[cell.gender]}</td>
            <td>${cell.birthday.str_date(`-`)}</td>
            <td>${cell.age}歳</td>
            <td>${cell.count}</td>
            <td>${cell.data_0}</td>
            <td>${cell.data_1}</td>
            <td>${cell.data_2}</td>
            <td>${cell.data_3}</td>
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
            <th>来院回数</th>
            <th>総合売上</th>
            <th>保険請求額</th>
            <th>保険負担金</th>
            <th>自費金額</th>
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
        }), `${filter_str}_顧客一覧${today.dD().str_date(`-`)}.xlsx`);
      });
    }

    desc_summary();
    desc_gender();
    desc_generation();
    desc_table();
  }

  desc_content_leveling();

  const desc_graph_init = (sender1,sender2,sender3,sender4) => {
    eval(`try {${sender1}.destroy();} catch(err) {}`);
    eval(`${sender2}.canvas.height = 100;`);
    eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
  }
  let gender_bar;
  let generation_bar;

  let gender_bar_ctx = document.getElementById('gender_bar').getContext('2d');
  desc_graph_init("gender_bar","gender_bar_ctx",'rounded_bar');
  let generation_bar_ctx = document.getElementById('generation_bar').getContext('2d');
  desc_graph_init("generation_bar","generation_bar_ctx",'rounded_bar');

  desc_static_sections();
}
var query_function = async () => {
  $('#content_base').html(
    `
    <div class="loading_base inline">
      <i class="fad fa-spinner-third fa-spin"></i>
    </div>
    `
  );

  let form = document.forms['query_form'];
  let fs_0 = form.elements['fs_0'].checked;
  let fs_1 = form.elements['fs_1'].checked;
  let fs_2 = form.elements['fs_2'].checked;
  let fs_3 = form.elements['fs_3'].checked;
  let fs_4 = form.elements['fs_4'].checked;
  let fs_5 = form.elements['fs_5'].checked;
  let fs_6 = form.elements['fs_6'].checked;
  let fs_7 = form.elements['fs_7'].checked;
  let fs_8 = form.elements['fs_8'].checked;
  let fs_9 = form.elements['fs_9'].checked;
  let fs_10 = form.elements['fs_10'].checked;
  let fs_11 = form.elements['fs_11'].checked;
  let fs_12 = form.elements['fs_12'].checked;
  let fs_13 = form.elements['fs_13'].checked;
  let fs_14 = form.elements['fs_14'].checked;
  let fs_15 = form.elements['fs_15'].checked;
  let fs_16 = form.elements['fs_16'].checked;

  let gender_id = fs_0 ? `${$('input[name="filter_gender_"]:checked').prop('value')}` : `1,2`;
  let sage = fs_1 ? form.elements['filter_age_0'].value : `0`;
  let eage = fs_1 ? form.elements['filter_age_1'].value : `1000`;
  let name = fs_2 ? form.elements['filter_name_0'].value : `nochoise`;
  let phone = fs_3 ? form.elements['filter_phone_0'].value : `nochoise`;
  let birth_month = fs_4 ? `${$('#filter_birth_0 option:selected').prop('value')}` : `none`;
  let count = fs_5 ? form.elements['filter_count_0'].value : `1`;
  let sin1 = fs_6 ? form.elements['filter_in1_0'].value : `1900-01-01`;
  let ein1 = fs_6 ? form.elements['filter_in1_1'].value : `2200-01-01`;
  let sin2 = fs_7 ? form.elements['filter_in2_0'].value : `1900-01-01`;
  let ein2 = fs_7 ? form.elements['filter_in2_1'].value : `2200-01-01`;
  let sout1 = fs_8 ? form.elements['filter_left1_0'].value : `1900-01-01`;
  let eout1 = fs_8 ? form.elements['filter_left1_1'].value : `1900-01-02`;
  let sout2 = fs_9 ? form.elements['filter_left2_0'].value : `1900-01-01`;
  let eout2 = fs_9 ? form.elements['filter_left2_1'].value : `1900-01-02`;
  let last = fs_10 ? form.elements['filter_last_0'].value : `2200-01-01`;
  let cls = fs_11 ? `${$('#filter_clinic_0 option:selected').prop('value')}` : `clinic_id`;
  let sfs = fs_12 ? `${$('#filter_staff_0 option:selected').prop('value')}` : `sf.id`;
  let sall = fs_13 ? form.elements['filter_all_0'].value : `0`;
  let eall = fs_13 ? form.elements['filter_all_1'].value : `1000000000000000000`;
  let sseikyu = fs_14 ? form.elements['filter_seikyu_0'].value : `0`;
  let eseikyu = fs_14 ? form.elements['filter_seikyu_1'].value : `1000000000000000000`;
  let shutan = fs_15 ? form.elements['filter_hutan_0'].value : `0`;
  let ehutan = fs_15 ? form.elements['filter_hutan_1'].value : `1000000000000000000`;
  let sjihi = fs_16 ? form.elements['filter_jihi_0'].value : `0`;
  let ejihi = fs_16 ? form.elements['filter_jihi_1'].value : `1000000000000000000`;

  (() => {
    let arr = ["性別","年齢","誕生月"];
    let gender = ["","男性","女性"];
    $('#setting_ios').prop('checked',false);
    let ap = ``;
    let sum = 0;
    for (let i = 0;i < 16;i++) {
      let bool = eval(`fs_${i}`);
      if (bool) {sum += 1;}
    }
    if (sum > 0) {ap += `<div class="cell inline">${sum}件の詳細絞り込み</div>`;}
    if (sum == 0) {
      ap = `<div class="cell inline">条件指定なし</div>`;
    }
    $('#setting_indi').html(
      `
      <div class="cell inline"><i class="fas fa-cogs"></i></div>
      ${ap}
      <div class="cell cell_indi inline"><i class="fas fa-caret-down"></i></div>
      `
    );
  })();
  const sender_data = {
    gender_id:gender_id,
    sage:sage,
    eage:eage,
    name:name,
    phone:phone,
    birth_month:birth_month,
    count:count,
    sin1:sin1,
    ein1:ein1,
    sin2:sin2,
    ein2:ein2,
    sout1:sout1,
    eout1:eout1,
    sout2:sout2,
    eout2:eout2,
    last:last,
    cls:cls,
    sfs:sfs,
    sall:sall,
    eall:eall,
    sseikyu:sseikyu,
    eseikyu:eseikyu,
    shutan:shutan,
    ehutan:ehutan,
    sjihi:sjihi,
    ejihi:ejihi
  }

  let result = await ajax_api_function("customer_search",sender_data);
  if (result.dataExists) {
    desc_function(result.data);
  } else {
    alert(`データ通信エラー:${result.reason}`);
  }
}

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);

  $(document).ready(async function(){
    (() => {
      $('.left_bar_base a:eq(17) .cell').addClass('selected');
      jQuery(function($) {
        $.extend( $.fn.dataTable.defaults, {
          language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
          }
        });
      });

      $('#page_ttl_base').html(`<div class="icn inline"><i class="fas fa-search"></i></div>顧客検索`);
      let today = new Date();
      let s = today.dMS().dD();
      let e = today.dD();
      $('#filter_in1_0').prop('value',s);
      $('#filter_in1_1').prop('value',e);
    })();

    const desc_init = async () => {
      let cls = await ajax_api_function("read_clinic_objs","");
      let sfs = await ajax_api_function("read_staff_objs","");
      if (cls.dataExists && sfs.dataExists) {
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
      } else {
        alert(`データ通信エラー:${cls.reason}`);
      }


      $(document).off('click','input[name="fs_"]').on('click','input[name="fs_"]',function() {
        let id = $(this).prop('id');
        if ($(this).prop('checked')) {
          $(`#${id} ~ .cont_base input`).prop('required',true);
        } else {
          $(`#${id} ~ .cont_base input`).prop('required',false);
        }
      });
      query_function();
    }
    desc_init();
  });
}
