String.prototype.bool = function(sender) {
  return this.toLowerCase() === 'true';
}
String.prototype.str_date = function(sender) {
  let lists = this.split('-');
  let string = ``;
  for (let i = 0;i < lists.length;i++) {
    string += `${lists[i]}`;
    if (i != lists.length - 1) string += sender;
  }
  return string;
}
Number.prototype.str_jp = function() {
  if (this == 0 || isNaN(this)) return 0;
  if (this >= 100000000) {
    return `${(Math.round(this / 1000000) / 100).toLocaleString()}億`;
  } else if (this >= 10000) {
    return `${(Math.round(this / 100) / 100).toLocaleString()}万`;
  }
  return `${(Math.round(this * 100) / 100).toLocaleString()}`;
}
Number.prototype.str_num = function() {
  if (this <= 9) {
    return `0${this}`;
  }
  return String(this);
}
Number.prototype.to_point = function(base) {
  if (this == 0 || base == 0) return 1;
  else return Math.round((this / base * 1000)) / 1000;
}
Number.prototype.to_devide = function(base) {
  if (this == 0 || base == 0) return 0;
  else return Math.round(this / base);
}
Number.prototype.to_one_point = function(base) {
  let value = (this / base);
  if (this == 0 || base == 0) {
    return 0;
  } else if (value >= 1000) {
    return Math.round(value);
  } else {
    return Math.round((value * 10)) / 10;
  }
}
Number.prototype.to_Perate = function(base) {
  if (this == 0 || base == 0) return 0;
  else return Math.round((this / base * 1000)) / 1000;
}
Number.prototype.to_perate = function(base) {
  if (this == 0 || base == 0) return 0;
  else return Math.round((this / base * 10000)) / 100;
}
Number.prototype.to_rate = function(base) {
  if (this == 0 || base == 0) return 0;
  // else if (this < 0) return Math.round(((-1 * this / base) * 10000)) / 100;
  return Math.round(((this / base) * 10000)) / 100;
}
Number.prototype.rate_str = function() {
  if (this == Infinity || this == -100) {
    return `<span class="rate_str">--%</span>`;
  } else {
    if (this == 0) {
      return `<span class="rate_str">--%</span>`;
    } else {
      return `<span class="rate_str index_${this>=100?`up`:`down`}">${this}%</span>`;
    }
  }
}

Number.prototype.rate_con_str = function() {
  if (this == Infinity || this == -100) {
    return `<span class="rate_str">--%</span>`;
  } else {
    if (this == 0) {
      return `<span class="rate_str">--%</span>`;
    } else {
      return `<span class="rate_str index_${this>=100?`up_d`:`down_u`}">${this}%</span>`;
    }
  }
}
Number.prototype.perate_str = function() {
  if (this == Infinity || this == -100) {
    return `<span class="rate_str">-100%</span>`;
  } else {
    if (this == 0) {
      return `<span class="rate_str">--%</span>`;
    } else if (this >= 100) {
      return `<span class="rate_str index_up">${this.toLocaleString()}%</span>`;
    } else {
      return `<span class="rate_str index_down">${this.toLocaleString()}%</span>`;
    }
  }
}
Number.prototype.margin_string = function() {
  if (this == Infinity || this == -100) {
    return `<span class="rate_str">--</span>`;
  } else {
    if (this == 0) {
      return `<span class="rate_str">--</span>`;
    } else if (this > 0) {
      return `<span class="rate_str">+${this.toLocaleString()}</span>`;
    } else {
      return `<span class="rate_str">${this.toLocaleString()}</span>`;
    }
  }
}
Number.prototype.margin_str = function(dim) {
  if (this == Infinity || this == -100 || isNaN(this)) {
    return `<span class="rate_str">--${dim}</span>`;
  } else {
    if (this == 0) {
      return `<span class="rate_str">--${dim}</span>`;
    } else if (this > 0) {
      return `<span class="rate_str index_up">+${this.toLocaleString()}${dim} </span>`;
    } else {
      return `<span class="rate_str index_down">${this.toLocaleString()}${dim} </span>`;
    }
  }
}
Number.prototype.margin_con_str = function(dim) {
  if (this == Infinity || this == -100) {
    return `<span class="rate_str">--${dim}</span>`;
  } else {
    if (this == 0) {
      return `<span class="rate_str">--${dim}</span>`;
    } else if (this > 0) {
      return `<span class="rate_str index_down">+${this.toLocaleString()}${dim} </span>`;
    } else {
      return `<span class="rate_str index_up">${this.toLocaleString()}${dim} </span>`;
    }
  }
}

Date.prototype.dD = function() {
  return `${this.getFullYear()}-${Number(this.getMonth() + 1).str_num()}-${Number(this.getDate()).str_num()}`;
}
Date.prototype.dM = function() {
  return `${this.getFullYear()}-${Number(this.getMonth() + 1).str_num()}`;
}
Date.prototype.dMS = function() {
  let date = (new Date(this.getFullYear(),this.getMonth(),1));
  return date;
}
Date.prototype.dME = function() {
  let date = (new Date(this.getFullYear(),this.getMonth() + 1,0));
  return date;
}
Date.prototype.dMET = function() {
  let end = new Date(this.getFullYear(),this.getMonth() + 1,0);
  let today_end = new Date().getDate();
  let date =
  end >= today_end
    ? new Date(this.getFullYear(),this.getMonth(),today_end)
    : new Date(this.getFullYear(),this.getMonth() + 1,0);
  return date;
}
Date.prototype.aD = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
Date.prototype.aM = function(months) {
  let month = new Date(this.valueOf());
  month.setMonth(month.getMonth() + months);
  return month;
}
Array.prototype.sum_val = function(cn) {
  let sum = 0;
  if (cn == ``) {
    sum = this.reduce((a,b) => a + b,0) || 0;
  } else {
    sum = this.reduce((a,b) => a + b[cn],0) || 0;
  }
  return sum;
}
Array.prototype.min_val = function(ct) {
  let value = 0;
  if (ct == ``) {
    value = Math.min.apply(null,this);
  } else {
    value = Math.min.apply(
      null,
      this.map(function(o){
        return o[ct];
      })
    );
  }
  if (value == -Infinity) return 0;
  else return value;
}
Array.prototype.max_val = function(ct) {
  let value = 0;
  if (ct == ``) {
    value = Math.max.apply(null,this);
  } else {
    value = Math.max.apply(
      null,
      this.map(function(o){
        return o[ct];
      })
    );
  }
  if (value == -Infinity) return 0;
  else return value;
}
Array.prototype.sort_asc = function(ct) {
  let arr = this.sort((a,b) => {
    if (a[ct] > b[ct]) {
      return 1;
    }
    return -1;
  });
  return arr;
}
Array.prototype.sort_desc = function(ct) {
  let arr = this.sort((a,b) => {
    if (a[ct] < b[ct]) {
      return 1;
    }
    return -1;
  });
  return arr;
}
Array.prototype.median_val = function(ct) {
  let half = (this.length/2|0);
  let arr = Array.from(this).sort((a,b) => {
    if (a[ct] > b[ct]) {
      return 1;
    }
    return -1;
  });
  if (arr.length%2) {
    return arr[half][ct];
  } else {
    if (arr.length >= 1) {
      return (arr[half - 1][ct] + arr[half][ct]) / 2;
    }
    return 0;
  }
}
Array.prototype.exist_val = function() {
  if (this.length == 0) {
    return false;
  } else {
    return true;
  }
}

const wna = ["日","月","火","水","木","金","土"];
const ptna = ["日別","週別","月別"];
const stna = ["","エリア","店舗","スタッフ","メニュー"];
const stia = [
  `<i class="fas fa-globe"></i>`,
  `<i class="fas fa-map-marked-alt"></i>`,
  `<i class="fas fa-clinic-medical"></i>`,
  `<i class="fas fa-user-tie"color:rgba(32,170,179,1);></i>`
];
const stca = [
  `background-color:rgb(18,83,164);`,
  `background-color:rgb(255,200,0);`,
  `background-color:rgba(242,100,100,1);`,
  `background-color:rgba(32,170,179,1);`
];
const pgca = [
  "rgba(54,100,180,1)",
  "rgba(54,100,180,.8)",
  "rgba(54,100,180,.6)",
  "rgba(54,100,180,.4)",
  "rgba(54,100,180,.2)"
];
const random_color = [
  "#26547C",
  "#EF476F",
  "#FFD166",
  "#06D6A0",
  "#068D9D",
  "#6D9DC5",
  "#80DED9",
  "#FFFCF9",
  "#AEECEF",
  "#3DA5D9"
];
const pmgca = [
  "rgba(18,83,164,1)",
  "rgba(18,83,164,.9)",
  "rgba(18,83,164,.8)",
  "rgba(18,83,164,.7)",
  "rgba(18,83,164,.6)",
  "rgba(18,83,164,.5)",
  "rgba(18,83,164,.4)",
  "rgba(18,83,164,.3)",
  "rgba(18,83,164,.2)",
  "rgba(18,83,164,.1)"
];
const cna = ["保険外","物販品","柔整","鍼灸","マッサージ","自賠責","労災","生活保護"];
const genderna = [
  "未成年 男性",
  "未成年 女性",
  "20~34歳 男性",
  "20~34歳 女性",
  "35~64歳 男性",
  "35~64歳 女性",
  "65~74歳 男性",
  "65~74歳 女性",
  "75歳~ 男性",
  "75歳~ 女性"
];

const MSD_smn = `msd_system_master`;
const MSD_client = [];

let ajax_api_progress = false;
const ajax_api_function = (sender1,sender2) => {
  if (!ajax_api_progress) {
    ajax_api_progress = true;
    sender2 = JSON.stringify(sender2);
    return new Promise((resolve,reject) => {
      try {
        console.time(`DB通信速度`);
        $.ajax({
          url: '/home/ajax_api',
          type: 'GET',
          data: ('sender1=' + sender1 + '&sender2=' + sender2),
          processData: false,
          contentType: false,
          dataType: 'json',
          timeout:120000,
          error: () => {
            ajax_api_progress = false;
            console.timeEnd(`DB通信速度`);
            resolve({"dataExists":false,"reason":"NetWork Timeout"});
          }
        })
        .done(function(data) {
          ajax_api_progress = false;
          console.timeEnd(`DB通信速度`);
          resolve(data.results);
        });
      } catch(err) {
        ajax_api_progress = false;
        reject('{\"dataExists\":false,\"reason\":\"DB server connection error\"}');
      }
    });
  }
}

const getNPS = (ps,pe,pt) => {
  let p_array = [];
  let c_date = ps;
  let week_ar = [6,0,1,2,3,4,5];
  if (pt == 0) {
    while (c_date.dD() <= pe.dD()) {
      let d = new Date(c_date);
      p_array.push(d.dD());
      c_date = c_date.aD(1);
    }
  } else if (pt == 1) {
    while (c_date.dD() <= pe.dD()) {
      let f_d = new Date(c_date.getFullYear(),0,1);
      let ma = f_d.getDay();

      let time = c_date.getTime() - f_d.getTime();
      let days = time / (86400 * 1000);
      let weeks = Math.floor((days + ma - 1) / 7) + 1;
      let year = f_d.getFullYear();

      const check_end = () => {
        let m = c_date.getMonth() + 1;
        let d = c_date.getDate();
        let w = c_date.getDay();
        if (m == 12 && (d + 7 - week_ar[w]) > 31) {
          weeks = 1;
          year += 1;
        }
      }
      check_end();

      p_array.push(`${year}-${weeks.str_num()}`)
      c_date = c_date.aD(7);
    }
  } else if (pt == 2) {
    while (c_date.dD() <= pe.dD()) {
      let d = new Date(c_date);
      p_array.push(d.dM());
      c_date = c_date.aM(1);
    }
  } else {
    return [];
  }
  return p_array;
}
const period_map = (ps,pe,pt) => {
  ps = new Date(ps);
  pe = new Date(pe);
  let return_arr = ps <= pe ? getNPS(ps,pe,pt) : [];
  return return_arr;
}
const psln_setter = (sender) => {
  $(`input[name="pt_"]:eq(${sender})`).prop('checked',true);
  let pllna = [
    ["今月","前月同日","前月","前年同月"],
    ["1~6週前","7~12週前","13~18週前"],
    ["1~6ヶ月前","1~12ヶ月前","13~18ヶ月前"]
  ];
  let ap = ``;
  for (let i = 0;i < pllna[sender].length;i++) {
    ap += `<button type="button" name="pilb">${pllna[sender][i]}</button> `;
  }

  $('.pilbb').html(ap);
}
const psl_setter = (index,ptn) => {
  let type = Number($('input[name="pt_"]:checked').prop('id').split('_')[1]);
  let today = new Date();
  let ps = ``,pe = ``;
  if (type == 0) {
    if (index == 0) {
      ps = `${today.dMS().dD()}`;
      pe = `${today.dD()}`;
    } else if (index == 1) {
      ps = `${today.aM(-1).dMS().dD()}`;
      pe = `${today.aM(-1).dMET().dD()}`;
    } else if (index == 2) {
      ps = `${today.aM(-1).dMS().dD()}`;
      pe = `${today.aM(-1).dME().dD()}`;
    } else if (index == 3) {
      ps = `${today.aM(-12).dMS().dD()}`;
      pe = `${today.aM(-12).dMET().dD()}`;
    }
  } else if (type == 1) {
    if (index == 0) {
      ps = `${today.aD(-7 * 6).dD()}`;
      pe = `${today.aD(-1).dD()}`;
    } else if (index == 1) {
      ps = `${today.aD(-7 * 12).dD()}`;
      pe = `${today.aD(-7 * 6 - 1).dD()}`;
    } else if (index == 2) {
      ps = `${today.aD(-7 * 18).dD()}`;
      pe = `${today.aD(-7 * 12 - 1).dD()}`;
    }
  } else if (type == 2) {
    if (index == 0) {
      ps = `${today.aM(-6).dMS().dD()}`;
      pe = `${today.aM(-1).dME().dD()}`;
    } else if (index == 1) {
      ps = `${today.aM(-12).dMS().dD()}`;
      pe = `${today.aM(-1).dME().dD()}`;
    } else if (index == 2) {
      ps = `${today.aM(-12).dMS().dD()}`;
      pe = `${today.aM(-7).dME().dD()}`;
    }
  }

  $(`#${ptn}_s`).prop('value',ps);
  $(`#${ptn}_e`).prop('value',pe);
}
const getDOM = (sender) => {
  let obj = document.getElementById(sender);
  return obj;
}
const getClassDOM = (sender) => {
  let obj = document.getElementsByClassName(sender);
  return obj;
}
const convert_pl = (pl,idx,pt) => {
  let label =
  pt == 0
  ? idx == 0 || pl.split('-')[2] == `01`
    ? `${Number(pl.split('-')[1])}/${Number(pl.split('-')[2])}`
    : `${Number(pl.split('-')[2])}`
  : idx == 0 || pl.split('-')[1] == `01`
    ? `${Number(pl.split('-')[0])}/${Number(pl.split('-')[1])}`
    : `${Number(pl.split('-')[1])}`;
  return label;
}


$(document).on('click',function(e){
  if(!$(e.target).closest('.header_base .n_r_b').length){
    $('input[name="header_input_"]').prop('checked',false);
  }
});

window.addEventListener('turbolinks:load',async function(e) {
  (() => {
    let hour = new Date().getHours();
    if (hour <= 5 || hour >= 18 || true) {
      $('body').addClass('dark_arisen');
    }
  })();
});

$(document).ready(function() {
  $(document).off('input','#acounts_modal_input').on('input','#acounts_modal_input',async function() {
    if (!MSD_client.exist_val()) {
      let result = await ajax_api_function("read_client_objs","");
      if (result.dataExists) {
        let objs = result.data.client;
        let ap = ``;

        objs.forEach((cell) => {
          ap += `<option value="${cell.client_id}">${cell.dbname} - ${cell.inc_name}</option>`;
        });

        setTimeout(() => {
          $('#acount_cover').fadeOut();
          $('#acount_select').html(ap);
        },1000);
      } else {
        alert('データ通信エラー');
      }
    }
  });

  $(document).off('input','input[name="pt_"]').on('input','input[name="pt_"]',function() {
    let index = $('input[name="pt_"]').index(this);
    psln_setter(index);
    psl_setter(0,"pi");
    if ($('#cpt').prop('checked')) psl_setter(1,"cpi");
  });
  $(document).off('click','button[name="pilb"]').on('click','button[name="pilb"]',function() {
    let ptn = $(this).parent().prop('id').split('_')[1];
    let index = Math.floor($(`#pilb_${ptn}_ button[name="pilb"]`).index(this));
    psl_setter(index,ptn);
  });
  $(document).off('click','#cpt').on('click','#cpt',function() {
    let bool = $(this).prop('checked');
    if (bool) {
      $('.cpi_').prop('required',true);
      psl_setter(1,"cpi");
    } else {
      $('.cpi_').prop('required',false);
    }
  });

  const help_tip_event = () => {
    // $(`#help_tips_pop`).hide();

    $(document).off('mouseenter','.help_tips').on('mouseenter','.help_tips',function() {
      let offset = $(this).offset();
      let data_title = $(this).attr('data-title');
      let data_text = $(this).attr('data-help');

      /*
      <div class="video">
        <iframe id="youtube" type="text/html" src="https://www.youtube.com/embed/Qpcbp_TnB8g?autoplay=1" frameborder="0"></iframe>
      </div>
      */
      $('#help_tips_pop').html(
        `
        <div class="title">${data_title}</div>

        <div class="cnt">
          ${data_text}
        </div>
        `
      );
      $(window).mousemove(function(e) {
        var x = e.pageX;
        var y = e.pageY;
        $(`#help_tips_pop`).css({left:x+'px',top:y+'px'});
      })
    });
    $(document).off('mouseleave','.help_tips').on('mouseleave','.help_tips',function() {
      $('#help_tips_pop').html(``);
      $(`#help_tips_pop`).css({left:'-100px',top:'-100px'});
    });
  }
  help_tip_event();

});
