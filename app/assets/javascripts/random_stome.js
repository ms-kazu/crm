var user_name = getDOM('user_name').value;

var desc_list = (data) => {
  let header = ``;
  let body = ``;
  (() => {
    (() => {
      let elms_axis = $('#ul_axis').children();
      for (let i = 0;i < elms_axis.length;i++) {
        let elm_axis = elms_axis[i];
        let name = $(`#ul_axis li:eq(${i})`).html();
        header += `<th>${name}</th>`;
      }
    })();
    (() => {
      let elms_column = $('#ul_column').children();
      for (let i = 0;i < elms_column.length;i++) {
        let elm_axis = elms_column[i];
        let name = $(`#ul_column li:eq(${i})`).html();
        header += `<th>${name}</th>`;
      }
    })();
  })();
  (() => {
    let axis_length = $('#ul_axis').children().length;
    let column_length = $('#ul_column').children().length;

    data.forEach((cell) => {
      let app = ``;
      for (let i = 0;i < axis_length;i++) {
        let data = cell[`axis_${i}`];
	let title =  $(`#ul_axis li:eq(${i})`).html();
	
	if ([`エリア`,`担当者`,`店舗`].includes(title)) {
          app += `<th>オブジェクト</th>`;
	} else {
          app += `<th>${data}</th>`;
	}
      }
      for (let i = 0;i < column_length;i++) {
        let data = cell[`column_${i}`];
        app += `<td>${data}</td>`;
      }
      body += `<tr>${app}</tr>`;
    });
  })();

  $('#list_table_base').html(
    `
    <table id="list_table" data-sheet-name="複合分析">
      <thead>
        <tr>${header}</tr>
      </thead>
      <tbody>${body}</tbody>
    </table>
    `
  );
  let table = $('#list_table').DataTable({
    columnDefs:[{type:'currency',targets:[2,3,4,5,6]}],
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
    if (data.length == 0) {alert('該当するデータがいないので、出力をキャンセルしました。');return;}
    let today = new Date();

    let wopts = {bookType: 'xlsx',bookSST: false,type: 'binary'};
    let workbook = {SheetNames: [],Sheets: {}};
    document.querySelectorAll('#list_table').forEach(function (currentValue, index) {
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
    }), `複合分析${today.dD().str_date(`-`)}.xlsx`);
  });
}

var query_leveling = async () => {
  let elms_axis = $('#ul_axis').children();
  let elms_column = $('#ul_column').children();

  if (elms_axis.length == 0 || elms_column.length == 0) {
    alert('軸または対象を選択してください。');
    return;
  }

  let axis_arr = [];
  let column_arr = [];
  for (let i = 0;i < elms_axis.length;i++) {
    let elm_axis = elms_axis[i];
    let group = elm_axis.id.split('_')[1];
    let id = elm_axis.id.split('_')[2];
    axis_arr.push({
      group:Number(group),
      id:Number(id)
    });
  }
  for (let i = 0;i < elms_column.length;i++) {
    let elm_column = elms_column[i];
    let id = elm_column.id.split('_')[1];
    column_arr.push({
      id:Number(id)
    });
  }

  let ps = $('#pi_s').prop('value');
  let pe = $('#pi_e').prop('value');

  const sender_data = {
    ps:ps,
    pe:pe,
    axis_arr:axis_arr,
    column_arr:column_arr
  }

  let result = await ajax_api_function("random_query",sender_data);
  if (result.dataExists) {
    desc_list(result.data,sender_data);
  } else {
    alert(`データ通信エラー:${result.reason}`);
  }
}

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);

  $(document).ready(async function(){
    (() => {
      $('.left_bar_base a:eq(13) .cell').addClass('selected');
      jQuery(function($) {
        $.extend( $.fn.dataTable.defaults, {
          language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
          }
        });
      });

      $('#page_ttl_base').html(`<div class="icn inline"><i class="fas fa-random"></i></div>ランダムクエリ`);

      (() => {
        let today = new Date();
        let ps = today.dMS().dD();
        let pe = today.dD();
        $('#pi_s').prop('value',ps);
        $('#pi_e').prop('value',pe);

      })();
      $('#ul_axis').sortable({connectWith: '#ul_axis'});
      $('.column_uls_0').sortable({connectWith: '.column_uls_0'});
      $('.column_uls_1').sortable({connectWith: '.column_uls_1'});
      $('.column_uls_2').sortable({connectWith: '.column_uls_2'});
    })();

    (() => {
      let name_arr = [
        ["","月次","週次","日次","曜日別","時間帯別"],
        ["","エリア","店舗","担当者"],
        ["","簡易5世代","10世代"],
        ["","男女"],
        ["","大分類","中分類","小分類","キーワード","自費メニュー"],
        ["","来店動機"],
      ];

      $(document).off('input','#axis_list_content_base input').on('input','#axis_list_content_base input',function() {
        let $this = $(this);
        let group = $this.prop('name').split('_')[2];
        let idx = $this.prop('id').split('_')[3];

        $(`#ul_axis li[name="axis_group_${group}_"]`).remove();
        if (idx != 0) {
          $(`#ul_axis`).append(`<li name="axis_group_${group}_" id="axis_${group}_${idx}">${name_arr[group][idx]}</li>`);
        }
      });
    })();
    (() => {
      const reset_column = () => {
        $('#ul_column').html(
          `
          <li id="column_0">総合売上</li>
          <li id="column_1">窓口売上(負担金+自費売上)</li>
          <li id="column_2">保険請求額</li>
          <li id="column_3">保険負担金</li>
          <li id="column_4">自費売上</li>
          `
        );
        $('#column_list_0').html(
          `
          <li id="column_5">物販品売上</li>
          <li id="column_6">柔整請求額売上</li>
          <li id="column_7">柔整負担金売上</li>
          <li id="column_8">鍼灸請求額売上</li>
          <li id="column_9">鍼灸負担金売上</li>
          <li id="column_10">マッサージ請求額売上</li>
          <li id="column_11">マッサージ負担金売上</li>
          <li id="column_12">自賠責売上</li>
          <li id="column_13">労災売上</li>
          <li id="column_14">生活保護売上</li>
          `
        );
        $('#column_list_1').html(
          `
          <li id="column_15">保険施術数</li>
          <li id="column_16">自費メニュー数</li>
          <li id="column_17">物販品数</li>
          <li id="column_18">柔整施術数</li>
          <li id="column_19">鍼灸施術数</li>
          <li id="column_20">マッサージ施術数</li>
          <li id="column_21">自賠責施術数</li>
          <li id="column_22">労災施術数</li>
          <li id="column_23">生活保護施術数</li>
          `
        );
        $('#column_list_2').html(
          `
          <li id="column_25">来院数</li>
          <li id="column_25">純患数</li>
          <li id="column_26">新患来院</li>
          <li id="column_27">既存来院</li>
          `
        );
      }

      reset_column();
      $(document).off('click','#column_reset').on('click','#column_reset',function() {
        reset_column();
      });
    })();
    (() => {
      query_leveling();
      $(document).off('click','#query_btn').on('click','#query_btn',function() {
        query_leveling();
      });
    })();
  });
}
