var create_keyword = async () => {
  let text = document.forms['create_keyword_form'].elements['keyword'].value;
  const sender_data = {keyword:text}
  let result = await ajax_api_function("create_keyword",sender_data);
  if (result.dataExists) {
    window.location.reload();
  } else {
    alert(`データ通信エラー:${result.reason}`);
  }
}
var delete_keyword = async () => {
  if (confirm('削除しますか？')) {
    let id = document.forms['delete_keyword_form'].elements['keyword_id'].value;
    const sender_data = {keyword_id:id}
    let result = await ajax_api_function("delete_keyword",sender_data);
    if (result.dataExists) {
      window.location.reload();
    } else {
      alert(`データ通信エラー:${result.reason}`);
    }
  }
}
var update_keyword = async () => {
  let text = document.forms['update_keyword_form'].elements['keyword'].value;
  let id = document.forms['update_keyword_form'].elements['keyword_id'].value;
  const sender_data = {keyword:text,id:id}
  let result = await ajax_api_function("update_keyword",sender_data);
  if (result.dataExists) {
    window.location.reload();
  } else {
    alert(`データ通信エラー:${result.reason}`);
  }
}

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);
  $(document).ready(async function(){
    $('.left_bar_base a:eq(1) label').addClass('selected');

    let key_list = [],menu_list = [];
    const desc_keyword_list = async () => {
      let result = await ajax_api_function("read_keyword_menus","");
      if (result.dataExists) {
        key_list = result.data;
        menu_list = result.data_menu;
        let ap = ``;
        key_list.forEach((cell) => {
          ap += `
          <input type="radio" name="keyword_cell_" id="keyword_cell_${cell.id}">
          <label for="keyword_cell_${cell.id}" class="text_overflow">
            <div class="label_box">
              <div class="check_box"></div>
              <div class="text">${cell.keyword}</div>
            </div>
          </label>
          `;
        });
        $('#cell_box').html(ap);
        desc_keyword_menu();
      } else {
        alert(`データ通信エラー:${result.reason}`);
      }
    }
    const desc_keyword_menu = () => {
      const desc_menus = async (sender) => {
        (() => {
          let keyword = key_list.filter(({id}) => id == sender);
          let key_name = keyword[0].keyword;
          let key_id = keyword[0].id;

          let key_menus = menu_list.filter(({keyword_id}) => keyword_id == sender);
          let non_menus = menu_list.filter(({keyword_id}) => keyword_id != sender);

          $('#key_name').html(key_name);
          $('#key_input_name').prop('value',key_name);
          $('#key_length').html(`${key_menus.length}メニュー`);
          $('.form_key_id').prop('value',key_id);
          (() => {
            let ap_key = ``;
            let ap_all = ``;

            key_menus.forEach((cell) => {
              ap_key +=
              `
              <li id="menu_cell_${cell.product_id}_${cell.keyword_id}">
                <div><i class="fas fa-caret-right"></i></div>
                <div class="text_overflow">${cell.product_name}</div>
                <div class="text_overflow">${cell.keyword_name}</div>
              </li>
              `;
            });
            non_menus.forEach((cell) => {
              ap_all +=
              `
              <li id="menu_cell_${cell.product_id}_${cell.keyword_id}">
                <div><i class="fas fa-caret-right"></i></div>
                <div class="text_overflow">${cell.product_name}</div>
                <div class="text_overflow">${cell.keyword_name}</div>
              </li>
              `;
            });
            $('#menu_key_list').html(ap_key);
            $('#all_menu_list').html(ap_all);
          })();
          (() => {
            $('.menu_ul').sortable({connectWith: '.menu_ul'});
            $('#menu_section').show();

            $(document).off('click','#update_menu_list').on('click','#update_menu_list',async function() {
              let elms_k = $('#menu_key_list').children();
              let elms_a = $('#all_menu_list').children();

              let register_ids = ``;
              let remove_ids = ``;
              for (let i = 0;i < elms_k.length;i++) {
                let elm = elms_k[i];
                let kywd_id = elm.id.split('_')[3];
                if (kywd_id != key_id) {
                  let id = elm.id.split('_')[2];
                  register_ids += `${id},`;
                }
              }
              register_ids += `"dummy"`;
              for (let i = 0;i < elms_a.length;i++) {
                let elm = elms_a[i];
                let kywd_id = elm.id.split('_')[3];
                if (kywd_id == key_id) {
                  let id = elm.id.split('_')[2];
                  remove_ids += `${id},`;
                }
              }
              remove_ids += `"dummy"`;

              const sender_data = {keyword_id:key_id,register_ids:register_ids,remove_ids:remove_ids}

              let result = await ajax_api_function("update_kywd_mns",sender_data);
              if (result.dataExists) {
                window.location.reload();
              } else {
                alert(`データ通信エラー:${result.reason}`);
              }
            });
          })();
        })();
      }
      $(document).off('click','input[name="keyword_cell_"]').on('click','input[name="keyword_cell_"]',function() {
        let id = $(this).prop('id').split('_')[2];
        desc_menus(id);
      });
    }
    desc_keyword_list();
  });
}
