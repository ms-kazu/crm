var user_name = getDOM('user_name').value;
var cname = getDOM(`cname`).value;

var desc_function = (data) => {

  const desc_static_sections = () => {
    const desc_privacy = () => {
      let gender = ["","男性","女性"];
      let obj = data.prvcy[0];
      $('#private_right_base').html(
        `
        <div class="title main">${obj.cname} <span>${obj.ckana}</span></div>
        <div class="title sub">${obj.age}歳 ${gender[obj.gender]}</div>
        `
      );
      $('#private_bottom_base').html(
        `
        <div class="row">
          <div class="indi">郵便番号</div>
          <div class="cont">〒${obj.postcd}</div>
        </div>
        <div class="row">
          <div class="indi">住所</div>
          <div class="cont">${obj.addr1} ${obj.addr2}</div>
        </div>
        <div class="row">
          <div class="indi">電話番号</div>
          <div class="cont">${obj.tel}</div>
        </div>
        <div class="row">
          <div class="indi">携帯</div>
          <div class="cont">${obj.mobile}</div>
        </div>
        <div class="row">
          <div class="indi">eメール</div>
          <div class="cont">${obj.email}</div>
        </div>
        <div class="row">
          <div class="indi">通院店舗</div>
          <div class="cont">${obj.clinic_name}</div>
        </div>
        <div class="row">
          <div class="indi">初回来院日</div>
          <div class="cont">${obj.min_sdate.str_date(`.`)}</div>
        </div>
        <div class="row">
          <div class="indi">最終来院日</div>
          <div class="cont">${obj.max_sdate.str_date(`.`)}</div>
        </div>
        `
      );
    }
    const desc_radar = () => {
      let obj_arr = [];
      let ave_arr = [];
      let data_arr = [];

      const desc_leveling = () => {
        (() => {
          let obj = data.cr;

          let data_0 = obj.sum_val(`data_0`);
          let data_1 = obj.sum_val(`data_1`).to_devide(data_0);
          let data_2 = obj.sum_val(`data_2`).to_devide(data_0);
          let data_3 = obj.sum_val(`data_3`).to_devide(data_0);
          let data_4 = obj.sum_val(`data_4`).to_devide(data_0);

          obj_arr = [data_0,data_1,data_2,data_3,data_4];
        })();
        (() => {
          let obj = data.ar;

          let devide_0 = obj.sum_val(`devide_0`);
          let data_0 = obj.sum_val(`data_0`).to_Perate(devide_0);
          let count = obj.sum_val(`data_0`);
          let data_1 = obj.sum_val(`data_1`).to_devide(count);
          let data_2 = obj.sum_val(`data_2`).to_devide(count);
          let data_3 = obj.sum_val(`data_3`).to_devide(count);
          let data_4 = obj.sum_val(`data_4`).to_devide(count);

          ave_arr = [data_0,data_1,data_2,data_3,data_4];
        })();
        for (let i = 0;i < 5;i++) {
          let data_0 = obj_arr[i];
          let data_1 = ave_arr[i];

          let rate = data_0.to_rate(data_1);
          if (rate >= 120) rate = 120;
          data_arr.push(rate);
        }
      }
      const desc_graph = () => {
        let graph_data = [{
          data:data_arr,
          backgroundColor:`rgba(54,100,180,.1)`,
          borderColor:`rgba(54,100,180,1)`,
          pointBackgroundColor:"#fff",
          pointBorderColor:`rgba(54,100,180,1)`,
          borderWidth: "1.5",
        }];
        let graph_option = {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          title: {display:true,fontSize:12,text:"顧客平均像との比較"},
          scale: {
            gridLines: {
              color:["#eee","#eee","#eee","#eee","#ccc","#eee"],
            },
            pointLabels: {
              fontSize:10,
              fontColor:'#73879C'
            },
            ticks: {
              beginAtZero: true,
              display: false,
              max: 120,
              min: 0,
              stepSize: 20,
              fontColor:"#73879C",
              callback: function(label, index, labels) {
                return Number(label).toLocaleString() + "人";
              }
            }
          },
          elements: {
            point:{
              radius:5,
              borderWidth: "2",
              backgroundColor:`rgba(255,255,255,1)`,
              borderColor:`rgba(54,183,235,1)`,
            }
          },
          responsive: true,
          tooltips: {
            bodySpacing:5,
            titleFontSize:12.5,
            bodyFontSize:15,
            intersect:false,
            callbacks: {
              label:function(t,d) {
                let index = t.index;
                let amount = t.yLabel;
                return `${amount == 120 ? `120%↑` : `${t.yLabel.toLocaleString()}%`}`;
              }
            }
          }
        }
        radar_pie.data = {
          labels:["来院回数","総合売上","保険請求","保険負担","自費売上"],
          datasets:graph_data
        };
        radar_pie.options = graph_option;
        radar_pie.update();
      }

      desc_leveling();
      desc_graph();
    }
    const desc_trend = () => {
      let data_arr = [];
      let ave_arr = [];

      let tpl = [];

      let objs = data.ct;
      let aves = data.at;

      const desc_leveling = () => {
        for (let i = 0;i < objs.length;i++) {
          tpl.push(`${i+1}回`);
          data_arr.push(objs[i].data_0);

          (() => {
            let ave = aves.filter(({count_num}) => count_num == i+1);
            let data_0 = ave.sum_val(`data_0`);
            let data_1 = ave.sum_val(`data_1`);

            let data = data_0.to_devide(data_1);

            ave_arr.push(data);
          })();
        }
        (() => {
          tpl.push(`${objs.length + 1}回`);

          let ave = aves.filter(({count_num}) => count_num == objs.length);
          if (ave.length == 1) {
            let data_0 = ave.sum_val(`data_0`);
            let data_1 = ave.sum_val(`data_1`);
            let data = data_0.to_devide(data_1);
            ave_arr.push(data);
          }
        })();
      }
      const desc_graph = () => {
        let graph_data = [{
          label:`${cname}の総合売上トレンド`,
          data:data_arr,
          backgroundColor:`rgba(54,100,180,.05)`,
          borderColor:"rgba(54,100,180,1)",
          borderWidth:2,
          pointRadius:0,
          pointBackgroundColor:"#fff",
          fill:false,
          yAxisID: "y-axis-0",
          cubicInterpolationMode: 'monotone',
          lineTension: 0
        },{
          label:`顧客総合売上トレンド`,
          data:ave_arr,
          backgroundColor:`rgba(242,100,100,.05)`,
          borderColor:`rgba(242,100,100,1)`,
          borderWidth:2,
          pointRadius:0,
          pointBackgroundColor:"#fff",
          fill:false,
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
                return `${index+1}回目`;
              },
              label:function(t,d) {
                let idx = t.datasetIndex;
                let amount = t.yLabel;
                let ar = [`${cname}`,"顧客平均"];
                return `${ar[idx]} ¥${amount.toLocaleString()}`;
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
      const desc_sum = () => {
        let ap = ``;
        let obj = data.cd;
        (() => {
          ap +=
          `
          <div class="sum">
            <div class="ttl">来院回数</div>
            <div class="conts">${objs.length}回</div>
          </div>
          `;
        })();
        (() => {
          ap +=
          `
          <div class="sum">
            <div class="ttl">施術回数</div>
            <div class="conts">${obj.length}回</div>
          </div>
          `;
        })();
        (() => {
          let pv = data.prvcy[0];
          let max = pv.max_sdate;
          let min = pv.min_sdate;
          let pal = period_map(min,max,0).length;
          let count = objs.length;

          let fn = pal.to_devide(count);
          ap +=
          `
          <div class="sum">
            <div class="ttl">来院周期</div>
            <div class="conts">${fn}日</div>
          </div>
          `;
        })();
        (() => {
          ap +=
          `
          <div class="sum">
            <div class="ttl">保険請求額</div>
            <div class="conts">¥${obj.sum_val(`data_0`).toLocaleString()}</div>
          </div>
          `;
        })();
        (() => {
          ap +=
          `
          <div class="sum">
            <div class="ttl">保険負担額</div>
            <div class="conts">¥${obj.sum_val(`data_1`).toLocaleString()}</div>
          </div>
          `;
        })();
        (() => {
          ap +=
          `
          <div class="sum">
            <div class="ttl">自費売上</div>
            <div class="conts">¥${obj.sum_val(`data_2`).toLocaleString()}</div>
          </div>
          `;
        })();

        $('#sum_base').html(ap);
      }

      desc_leveling();
      desc_graph();
      desc_sum();
    }
    const desc_details = () => {
      let objs = data.cd;

      let ap = ``;

      var date_current = ``;
      objs.forEach((cell) => {
        if (date_current != cell.sdate) {
          ap += `<tr><th style="border-right:0;" colspan="8"></th></tr>`;
          date_current = cell.sdate;
        }

        ap +=
        `
        <tr>
          <th>${cell.sdate.str_date(`.`)}</th>
          <th>¥${cell.data_0.toLocaleString()}</th>
          <th>¥${cell.data_1.toLocaleString()}</th>
          <th>¥${cell.data_2.toLocaleString()}</th>
          <td>${cna[cell.type]}</td>
          <td>${cell.product_name}</td>
          <td>${cell.treat_min}分</td>
          <td>
            <a href="/achieve_analytics?st=2&ss=true&si=${cell.staff_id}">
              ${cell.staff_name}
            </a>
          </td>
        </tr>
        `;
      });

      $('#details_table_base').html(
        `
        <table>
          <thead>
            <tr>
              <th>来院日</th>
              <th>保険請求額</th>
              <th>保険負担金</th>
              <th>自費売上</th>
              <th>施術タイプ</th>
              <th>メニュー</th>
              <th>施術時間</th>
              <th>担当者</th>
            </tr>
          </thead>
          <tbody>${ap}</tbody>
        </table>
        `
      );
    }

    desc_privacy();
    desc_radar();
    desc_trend();
    desc_details();
  }

  const desc_graph_init = (sender1,sender2,sender3,sender4) => {
    eval(`try {${sender1}.destroy();} catch(err) {}`);
    eval(`${sender2}.canvas.height = 100;`);
    eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
  }

  let radar_pie;
  let trend_line;

  let radar_pie_ctx = document.getElementById('radar_pie').getContext('2d');
  desc_graph_init("radar_pie","radar_pie_ctx",'radar');
  let trend_line_ctx = document.getElementById('trend_line').getContext('2d');
  desc_graph_init("trend_line","trend_line_ctx",'LineWithLine');

  desc_static_sections();
}
var query_function = async (cid,ptno) => {
  const sender_data = {
    cid:cid,
    ptno:ptno
  }
  let datas = await ajax_api_function("read_customer_objs",sender_data);
  if (datas.dataExists) {
    desc_function(datas.data.data);
  } else {
    alert(`データ通信エラー:${datas.reason}`);
  }
}

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);

  $(document).ready(async function(){
    const desc_init = async () => {
      let cid = getDOM(`cid`).value;
      let ptno = getDOM(`ptno`).value;
      query_function(cid,ptno);
    }
    desc_init();
  });
}
