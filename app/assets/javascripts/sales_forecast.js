var user_name = getDOM('user_name').value;

var desc_function = (data,so) => {
  let objs = data.data.obj;
  let sum_obj = data.data.summary;
  let obj_m = data.data.m;
  let obj_mmm = data.data.mmm;
  let opens = data.data.opens;

  let st = so.st;
  let p0 = so.p0;
  let p1 = so.p1;
  let p2 = so.p2;
  let p3 = so.p3;
  let pe = so.pe;
  let ts = so.ts;

  let pa_m = period_map(p0,pe,0);
  let pa_mmm = period_map(p2,pe,0);
  let pa_arr = [pa_m,pa_mmm];
  let obj_arr = [obj_m,obj_mmm];

  const desc_content_leveling = () => {
    $('#content_base').html(
      `
      <div class="section">
        <div class="switch_base left">
          <input type="radio" name="trend_input_" id="trend_input_0" checked>
          <label for="trend_input_0">30日のトレンド</label>
          <input type="radio" name="trend_input_" id="trend_input_1">
          <label for="trend_input_1">90日のトレンド</label>
        </div>
        <div class="cells_box">
          <div class="cell cell_1x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">総合売上サマリ</div>
              <div class="content _bar_box_">
                <div class="base" id="summary_base">
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_3x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">トレンド</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap graph_wrap_forecast">
                    <canvas id="trend_line" width="350" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_4x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">個別集計</div>
              <div class="content _segment_">
                <div class="table_base table_base2" id="obj_table_base">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    );
  }
  const desc_static_sections = (ti) => {
    let pa = pa_arr[ti];
    let obj = obj_arr[ti];
    let week_objs = [];
    let accuracy = sum_obj.length.to_perate((sum_obj.length + period_map(p1,pe,0).length - 1)).to_Perate(1);

    let month_data_0 = 0;
    let month_data_1 = 0;
    let month_data_2 = 0;
    let month_data_3 = obj.filter(({period}) => period >= ts).sum_val('data_0');
    let month_data_4 = obj.filter(({period}) => period >= ts).sum_val('data_1');
    let month_data_5 = obj.filter(({period}) => period >= ts).sum_val('data_2');

    const desc_week_leveling = () => {
      for (let i = 0;i < 7;i++) {
        let result = sum_obj.filter(({week}) => week == i);
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
        for (let idx = 0;idx < pa.length;idx++) {
          let label = pa[idx];
          tpl.push(convert_pl(label,idx,0));

          let result = obj.filter(({period}) => period == label);
          let data_0 = result.sum_val('data_0');
          if (label <= p1) achieve_arr.push(data_0);
          else achieve_arr.push(null);

          if (label >= p1) {
            if (label == p1) {
              forecast_arr.push(data_0);
              forecast_up_arr.push(data_0);
              forecast_down_arr.push(data_0);
            } else {
              let year = label.split('-')[0];
              let month = Number(label.split('-')[1]) - 1;
              let day = Number(label.split('-')[2]);
              let w = new Date(year,month,day).getDay();

              let data_0 = week_objs[w].ave_0;
              let data_1 = week_objs[w].ave_1;
              let data_2 = week_objs[w].ave_2;
              let data_up = (data_0 * (1+accuracy/100)).to_devide(1);
              let data_down = (data_0 * (1-accuracy/100)).to_devide(1);

              month_data_0 += data_0;
              month_data_1 += data_1;
              month_data_2 += data_2;

              forecast_arr.push(data_0);
              forecast_up_arr.push(data_up);
              forecast_down_arr.push(data_down);
            }
          } else {
            forecast_arr.push(null);
            forecast_up_arr.push(null);
            forecast_down_arr.push(null);
          }
        }
      }
      const desc_graph = () => {
        let graph_data = [{
          label:`過去${ti == 0?`30`:`90`}日の実績`,
          data:achieve_arr,
          borderColor:"rgb(18,83,164)",
          borderWidth:1.5,
          pointRadius:5,
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
          pointRadius:5,
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
          pointRadius:4,
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
          pointRadius:4,
          borderDash: [4,2],
          fill:"1",
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
                maxTicksLimit:8,
                min:0,
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
                let ar = ["実績値","予測推移","上方修正","下方修正"];
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
    const desc_summary = () => {
      let data_0 = month_data_0;
      let data_1 = (month_data_0 * (1+(100 - accuracy)/100)).to_devide(1);
      let data_2 = (month_data_0 * (1-(100 - accuracy)/100)).to_devide(1);
      let data_3 = month_data_3;
      let data_4 = month_data_0 + month_data_3;
      $('#summary_base').html(
        `
        <div class="row">
          <div class="indi">予測売上残値</div>
          <div class="content">
            <div class="amount">¥${data_0.toLocaleString()}</div>
          </div>
        </div>
        <div class="row">
          <div class="indi">上方修正値</div>
          <div class="content">
            <div class="amount" style="color:rgb(54,183,235)">¥${data_1.toLocaleString()}</div>
          </div>
        </div>
        <div class="row">
          <div class="indi">下方修正値</div>
          <div class="content">
            <div class="amount" style="color:rgb(242,100,100)">¥${data_2.toLocaleString()}</div>
          </div>
        </div>
        <div class="row">
          <div class="indi">現在の実績値</div>
          <div class="content">
            <div class="amount">¥${data_3.toLocaleString()}</div>
          </div>
        </div>
        <div class="row">
          <div class="indi">今月末の売上予測</div>
          <div class="content">
            <div class="amount" style="font-weight:300;font-size:2rem;">¥${data_4.toLocaleString()}</div>
          </div>
        </div>
        <div class="row">
          <div class="indi">精度</div>
          <div class="contents">
            <div class="amount">${accuracy}%</div>
            <div class="bb"><div class="b" style="width:${accuracy}%;"></div></div>
          </div>
        </div>
        `
      );
    }
    const desc_table = () => {
      $('#obj_table_base').html(``);

      let ap = ``;

      let sum_forecast_0 = 0;
      let sum_forecast_1 = 0;
      let sum_forecast_2 = 0;
      let accuracy_sum = 0;

      objs.forEach((cell) => {
        let result = obj.filter(({obj_id}) => obj_id == cell.obj_id);
        let result_open = opens.filter(({obj_id}) => obj_id == cell.obj_id);

        let obj_accuracy = result.length.to_perate((result.length + period_map(p1,pe,0).length - 1)).to_Perate(1);
        accuracy_sum += obj_accuracy;

        let ave_0_arr = [],ave_1_arr = [],ave_2_arr = [];
        for (let i = 0;i < 7;i++) {
          let rslt = result.filter(({week}) => week == i);
          let data_0 = rslt.sum_val('data_0');
          let data_1 = rslt.sum_val('data_1');
          let data_2 = rslt.sum_val('data_2');

          ave_0_arr.push(data_0.to_devide(rslt.length));
          ave_1_arr.push(data_1.to_devide(rslt.length));
          ave_2_arr.push(data_2.to_devide(rslt.length));
        }
        let achieve_0 = result.filter(({period}) => period >= ts).sum_val('data_0');
        let achieve_1 = result.filter(({period}) => period >= ts).sum_val('data_1');
        let achieve_2 = result.filter(({period}) => period >= ts).sum_val('data_2');
        let forecast_0 = 0;
        let forecast_1 = 0;
        let forecast_2 = 0;
        pa.forEach((label) => {
          if (label > p1) {
            let rslt_open = result_open.filter(({period}) => period == label);
            let status = rslt_open.sum_val(`status`);

            if (status == 1) {
              forecast_0 += 0;
              forecast_1 += 0;
              forecast_2 += 0;
            } else {
              let year = label.split('-')[0];
              let month = Number(label.split('-')[1]) - 1;
              let day = Number(label.split('-')[2]);
              let w = new Date(year,month,day).getDay();

              let data_0 = ave_0_arr[w];
              let data_1 = ave_1_arr[w];
              let data_2 = ave_2_arr[w];

              forecast_0 += data_0;
              forecast_1 += data_1;
              forecast_2 += data_2;
            }
          }
        });

        sum_forecast_0 += forecast_0;
        sum_forecast_1 += forecast_1;
        sum_forecast_2 += forecast_2;

        ap +=
        `
        <tr>
          <th>${cell.obj_name}</th>
          <td>¥${achieve_0.toLocaleString()}</td>
          <td>¥${achieve_1.toLocaleString()}</td>
          <td>${achieve_2.toLocaleString()}</td>
          <td>¥${(achieve_0 + forecast_0).toLocaleString()}</td>
          <td>¥${(achieve_1 + forecast_1).toLocaleString()}</td>
          <td>${(achieve_2 + forecast_2).toLocaleString()}</td>
          <td>${obj_accuracy}%</td>
        </tr>
        `;
      });
      (() => {
        let achieve_0 = obj.filter(({period}) => period >= ts).sum_val('data_0');
        let achieve_1 = obj.filter(({period}) => period >= ts).sum_val('data_1');
        let achieve_2 = obj.filter(({period}) => period >= ts).sum_val('data_2');

        let ave_accuracy = accuracy_sum.to_Perate(objs.length);

        ap +=
        `
        <tr>
          <th>個別集計予測</th>
          <th>¥${achieve_0.toLocaleString()}</th>
          <th>¥${achieve_1.toLocaleString()}</th>
          <th>${achieve_2.toLocaleString()}</th>
          <th>¥${(achieve_0 + sum_forecast_0).toLocaleString()}</th>
          <th>¥${(achieve_1 + sum_forecast_1).toLocaleString()}</th>
          <th>${(achieve_2 + sum_forecast_2).toLocaleString()}</th>
          <td>${ave_accuracy}%</td>
        </tr>
        `;

      })();

      $('#obj_table_base').html(
        `
        <table id="obj_table">
          <thead>
            <tr>
              <th>名前</th>
              <th>総売 実績値</th>
              <th>自費　実績値</th>
              <th>来院数　実績値</th>
              <th>月末予測 総売</th>
              <th>月末予測 自費</th>
              <th>月末予測 来院数</th>
              <th>精度</th>
            </tr>
          </thead>
          <tbody>${ap}</tbody>
        </table>
        `
      );

      let table = $('#obj_table').DataTable({
        columnDefs:[{type:'currency',targets:[1,2,3,4,5]}],
        displayLength:10,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        paging: true,
        order:[[4,"desc"]]
      });
    }

    desc_week_leveling();
    desc_trend();
    desc_summary();
    desc_table();
  }

  desc_content_leveling();
  const desc_graph_init = (sender1,sender2,sender3,sender4) => {
    eval(`try {${sender1}.destroy();} catch(err) {}`);
    eval(`${sender2}.canvas.height = 100;`);
    eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
  }

  let trend_line;

  let trend_line_ctx = document.getElementById('trend_line').getContext('2d');
  desc_graph_init("trend_line","trend_line_ctx",'crossed_lines');

  $(document).off('input','input[name="trend_input_"]').on('input','input[name="trend_input_"]',function() {
    let index = $('input[name="trend_input_"]').index(this);
    desc_static_sections(index);
  });
  desc_static_sections(0);
}
var query_function = async () => {
  let form = document.forms['query_form'];
  let st = $('#obj_select option:selected').prop('value');

  (() => {
    let stna = ["エリア別","店舗別","担当者別"];
    $('#setting_ios').prop('checked',false);
    $('#setting_indi').html(
      `
      <div class="cell inline"><i class="fas fa-cogs"></i></div>
      <div class="cell inline">${stna[st]}</div>
      <div class="cell cell_indi inline"><i class="fas fa-caret-down"></i></div>
      `
    );
  })();

  let today = new Date();

  let p0 = `${today.aD(-30).dD()}`;
  let p1 = `${today.aD(-1).dD()}`;
  let p2 = `${today.aD(-90).dD()}`;
  let p3 = `${today.aD(-1).dD()}`;
  let pe = `${today.dME().dD()}`;
  let ts = `${today.dMS().dD()}`;
  const sender_data = {
    st:Number(st),
    p0:p0,
    p1:p1,
    p2:p2,
    p3:p3,
    pe:pe,
    ts:ts
  }

  $('#content_base').html(`<div class="loading_base inline"><i class="fad fa-spinner-third fa-spin"></i></div>`);
  let result = await ajax_api_function("sales_forecast",sender_data);
  if (result.dataExists) {
    desc_function(result.data,sender_data);
  } else {
    alert(`データ通信エラー:${result.reason}`);
  }
}

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);

  $(document).ready(async function(){
    $('.left_bar_base a:eq(4) .cell').addClass('selected');

    (() => {
      jQuery(function($) {
        $.extend( $.fn.dataTable.defaults, {
          language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
          }
        });
      });

      let s_type = (getDOM(`s_type`).value);
      $(`#obj_select option[value="${s_type}"]`).prop('selected',true);
    })();

    const desc_init = async () => {
      await query_function();
    }
    desc_init();
  });
}
