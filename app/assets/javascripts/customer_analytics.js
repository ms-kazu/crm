var user_name = getDOM('user_name').value;
var clinic_objs = [];

var desc_function = (data,so) => {
  let pt = 2;
  let ps = getDOM(`pi_s`).value;
  let pe = getDOM(`pi_e`).value;
  let pa = so.pa;

  if (!data.data.summary.exist_val()) {
    $('#content_base').html(`<div class="loading_base inline">データがありません。</div>`);
    return;
  }

  const desc_content_leveling = () => {
    $('#content_base').html(
      `
      <div class="section">
        <div class="section_title">属性と遷移,サマリ</div>
        <div class="cells_box">
          <div class="cell cell_2x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">顧客タイプのトレンド</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="trend_line" width="250" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_2x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">男女別人数分布と客単価</div>
              <div class="content _trend_ _gender_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="male_bar" width="450" height="100"></canvas>
                  </div>
                  <div class="graph_wrap">
                    <canvas id="female_bar" width="450" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">来院回数別の売上効率</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="bubble_chart" width="150" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">世代別の指標推移関係</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="cup_scatter" width="150" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_2x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">来院回数別の売上トレンド</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="count_chart" width="300" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_1x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">総合売上詳細サマリ</div>
              <div class="content _bar_box_">
                <div class="base" id="sales_per">
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_2x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">売上箱ひげ図</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="sales_boxplot" width="300" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section_title">人気メニュー</div>
        <div class="cells_box">
          <div class="cell cell_2x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">
                男女別人気メニュー
                <div class="icon inline">
                  <i class="fas fa-question-circle help_tips" data-title="顧客属性毎の人気メニュー" data-help="顧客属性毎の人気メニューは上位10位まで表示されます。また、施術された回数と売上の割合は自費メニューの総施術数と総売上の比です。"></i>
                </div>
              </div>
              <div class="content _segment_">
                <div class="table_base table_base1 table_base2 table_base_th ">
                  <div class="table_btn_base btn_legnth_2">
                    <input type="radio" name="genlm_input_" id="genlm_input_0" checked>
                    <label for="genlm_input_0"><i class="fas fa-mars"></i> 男性</label>
                    <input type="radio" name="genlm_input_" id="genlm_input_1">
                    <label for="genlm_input_1"><i class="fas fa-venus"></i> 女性</label>
                  </div>
                  <table id="genlm_table">
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_2x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">
                世代別人気メニュー
              </div>
              <div class="content _segment_">
                <div class="table_base table_base1 table_base2 table_base_th ">
                  <div class="table_btn_base btn_legnth_5">
                    <input type="radio" name="genelm_input_" id="genelm_input_0">
                    <label for="genelm_input_0">~19歳</label>
                    <input type="radio" name="genelm_input_" id="genelm_input_1">
                    <label for="genelm_input_1">20~34歳</label>
                    <input type="radio" name="genelm_input_" id="genelm_input_2" checked>
                    <label for="genelm_input_2">35~64歳</label>
                    <input type="radio" name="genelm_input_" id="genelm_input_3">
                    <label for="genelm_input_3">65~74歳</label>
                    <input type="radio" name="genelm_input_" id="genelm_input_4">
                    <label for="genelm_input_4">75歳~</label>
                  </div>
                  <table id="genelm_table">
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_4x1 inline">
            <div class="box cell_link">
              <div class="cell_title cell_title_r text_overflow">
                男女世代別人気メニュー
                <div class="icon inline">
                  <i class="fas fa-question-circle help_tips" data-title="テーブルセルのクリック" data-help="テーブルセルをクリックすると他順位,他セグメントの同じメニューを合算した概要が表示されます。"></i>
                </div>
              </div>
              <div class="content _segment_">
                <div class="switch_base left">
                  <input type="radio" name="genederlm_input_" id="genederlm_input_0" checked>
                  <label for="genederlm_input_0">
                    <i class="fas fa-folder-open"></i> メニュー名
                  </label>
                  <input type="radio" name="genederlm_input_" id="genederlm_input_1">
                  <label for="genederlm_input_1">
                    <i class="fas fa-th"></i> 実績マップ(施術回数)
                  </label>
                  <input type="radio" name="genederlm_input_" id="genederlm_input_2">
                  <label for="genederlm_input_2">
                    <i class="fas fa-th"></i> 実績マップ(売上)
                  </label>
                </div>
                <div class="table_base table_base1">
                  <table id="genederlm_table">
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_4x1 inline">
            <div class="box cell_link">
              <div class="cell_title cell_title_r text_overflow">
                自費メニュー人気セットパターン

                <div class="icon inline">
                  <i class="fas fa-question-circle help_tips" data-title="" data-help="該当患者数には自費メニューを受けた顧客あたりの割合を表示しています。"></i>
                </div>
              </div>
              <div class="content _segment_">
                <div class="table_base table_base1 no_border table_base_th">
                  <table id="action_table">
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section_title">マッピング</div>
        <div class="segment_box">
          <div class="map_base" id="map_base">
            <div class="cover">
              <button id="open_map">マップを表示する</button>
            </div>
            <div id="map_sum_base" style="font-size:.8rem;">
            </div>
            <div class="filter_base">
              <input type="radio" name="mst_" id="mst_0" checked>
              <label for="mst_0">世代</label>
              <input type="radio" name="mst_" id="mst_1">
              <label for="mst_1">性別</label>
              <input type="radio" name="mst_" id="mst_2">
              <label for="mst_2">来院回数</label>
              <input type="radio" name="mst_" id="mst_3">
              <label for="mst_3">自費売上</label>
            </div>
            <div class="filter_base" id="msti_base">
            </div>
            <div class="filter_base padding_01px" id="clinic_filter_base">
            </div>
            <div id="canvas_map">
            </div>
            <div class="indi_base">
              <div class="cel">
                <img class="inline" src="/assets/man_100w.png">
                <div class="amount inline" id="indi_sum_map_0">
                </div>
              </div>
              <div class="cel">
                <img class="inline" src="/assets/man_100b.png">
                <div class="amount inline" id="indi_sum_map_1">
                </div>
              </div>
              <div class="cel">
                <img class="inline" src="/assets/man_100y.png">
                <div class="amount inline" id="indi_sum_map_2">
                </div>
              </div>
              <div class="cel">
                <img class="inline" src="/assets/man_100r.png">
                <div class="amount inline" id="indi_sum_map_3">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section_title">顧客リピート実績</div>
        <div class="cells_box">
          <div class="cell cell_4x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">月間リピートサマリ</div>
              <div class="content _segment_">
                <div class="base">
                  <div class="table_base table_base1 table_base2">
                    <div class="table_btn_base btn_legnth_3">
                      <input type="radio" name="repeat_input_" id="repeat_input_0" checked>
                      <label for="repeat_input_0">全て</label>
                      <input type="radio" name="repeat_input_" id="repeat_input_1">
                      <label for="repeat_input_1">新患</label>
                      <input type="radio" name="repeat_input_" id="repeat_input_2">
                      <label for="repeat_input_2">既存</label>
                    </div>
                    <table id="repeat_summary_table_base">
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="cell cell_4x1 desktop_touch_elm inline">
            <div class="box">
              <div class="cell_title text_overflow">
                表マップ
                <div class="icon inline">
                  <i class="fas fa-question-circle help_tips" data-title="データセルのクリック" data-help="表中にあるデータセルをクリックすることで対応する顧客一覧をexcel形式で抽出できます。"></i>
                </div>
              </div>
              <div class="content _segment_">
                <div class="base">
                  <div class="table_base no_border table_base_data_cell">
                    <table id="repeat_table_base">
                    </table>
                  </div>
                  <div class="table_base table_base1 no_border table_base_data_cell">
                    <table id="left_table_base">
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section_title">
          デシル分析

          <i class="fas fa-question-circle help_tips" data-title="デシル分析とは？" data-help="純顧客を売上の高い順に並べ10段階のグループに分ける分析方法です。こうする事で顧客の優良可不可を分けて各グループの特性を分析できます。"></i>
        </div>
        <div class="cells_box">
          <div class="cell cell_2ax1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">デシル別グループ総合売上と累計比率</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="decyle_bar" width="300" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_2ax1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">デシル別売上効率</div>
              <div class="content _trend_">
                <div class="base">
                  <div class="graph_wrap">
                    <canvas id="decyle_line" width="300" height="100"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_4x1 inline">
            <div class="box">
              <div class="cell_title text_overflow">デシル別顧客実績</div>
              <div class="content _summary_page_ _table_list_">
                <div class="base">
                  <div class="btn_base desktop_elm" style="text-align:right;">
                    <button id="decyle_customer_excel">
                      <i class="fas fa-file-excel"></i> 顧客一覧.xlsx
                    </button>
                  </div>
                  <div class="table_base table_base1" id="decyle_table_base">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section_title">
          RFM分析
          <i class="fas fa-question-circle help_tips" data-title="RFM分析とは？" data-help="
          純顧客のグループ分けを
          <br>R : recency(最新度)
          <br>F : frequency(頻度)
          <br>M : monetize(収益性)
          <br>
          の3つの軸で仕分けして各々の特性を分析する手法です。
          優良顧客、非優良顧客、新規顧客、安定顧客、離反顧客などに分類することで、セグメント毎のキャラクターを浮き彫りにしプロモーション手段の最適化を図ることができます。"></i>

          <i class="fas fa-question-circle help_tips" data-title="修正の重要性" data-help="RFM分析ではまず顧客をグルーピングすることから始まりますが、特定のグループに極端な振り分け方になってしてしまう場合(1~4%以下や68%以上)、公平に分析できない可能性があるので条件値の修正が必要になります。"></i>
        </div>
        <div class="cells_box">
          <div class="cell cell_1x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">設定値の定義と修正</div>
              <div class="content _rfm_">
                <div class="base">
                  <div class="setting_rfm_box">
                    <div class="row">
                      <div class="row_title">R ...直近来院</div>
                      <div class="input_base input_base_r">
                        <div class="ib">
                          <div class="ibt ibt_0"><i class="fas fa-stop"></i> R5</div>
                          <input type="number" name="rfm_r_" id="rfm_r_5" value="7">
                          日以内に来院
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_1"><i class="fas fa-stop"></i> R4</div>
                          <input type="number" name="rfm_r_" id="rfm_r_4" value="14">
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_2"><i class="fas fa-stop"></i> R3</div>
                          <input type="number" name="rfm_r_" id="rfm_r_3" value="30">
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_3"><i class="fas fa-stop"></i> R2</div>
                          <input type="number" name="rfm_r_" id="rfm_r_2" value="90">
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_4"><i class="fas fa-stop"></i> R1</div>
                          <input type="number" name="rfm_r_" id="rfm_r_1" value="365">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="row_title">F ...頻度</div>
                      <div class="input_base input_base_f">
                        <div class="ib">
                          <div class="ibt ibt_0"><i class="fas fa-stop"></i> F5</div>
                          <input type="number" name="rfm_f_" id="rfm_f_5" value="20">
                          回以上来院
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_1"><i class="fas fa-stop"></i> F4</div>
                          <input type="number" name="rfm_f_" id="rfm_f_4" value="10">
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_2"><i class="fas fa-stop"></i> F3</div>
                          <input type="number" name="rfm_f_" id="rfm_f_3" value="5">
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_3"><i class="fas fa-stop"></i> F2</div>
                          <input type="number" name="rfm_f_" id="rfm_f_2" value="3">
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_4"><i class="fas fa-stop"></i> F1</div>
                          <input type="number" name="rfm_f_" id="rfm_f_1" value="1">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="row_title">M ...支払額</div>
                      <div class="input_base input_base_m">
                        <div class="ib">
                          <div class="ibt ibt_0"><i class="fas fa-stop"></i> M5</div>
                          <input type="number" name="rfm_m_" id="rfm_m_5" value="100000">
                          円以上支払い
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_1"><i class="fas fa-stop"></i> M4</div>
                          <input type="number" name="rfm_m_" id="rfm_m_4" value="50000">
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_2"><i class="fas fa-stop"></i> M3</div>
                          <input type="number" name="rfm_m_" id="rfm_m_3" value="25000">
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_3"><i class="fas fa-stop"></i> M2</div>
                          <input type="number" name="rfm_m_" id="rfm_m_2" value="10000">
                        </div>
                        <div class="ib">
                          <div class="ibt ibt_4"><i class="fas fa-stop"></i> M1</div>
                          <input type="number" name="rfm_m_" id="rfm_m_1" value="0">
                        </div>
                      </div>
                    </div>

                    <div class="cuo_summary">
                      <div class="csttl">RMF分布の偏りのサマリ</div>
                      <div class="bar_base_">
                        <div class="rfm_rate_indi" id="rfm_result_indi_r_base"></div>
                        <div class="bar_base bar_base_r inline" id="bar_base_r">
                          <div class="bar bar_0 inline"></div>
                          <div class="bar bar_1 inline"></div>
                          <div class="bar bar_2 inline"></div>
                          <div class="bar bar_3 inline"></div>
                          <div class="bar bar_4 inline"></div>
                        </div>
                        <div class="result_base" id="rfm_result_r_base">
                        </div>
                      </div>
                      <div class="bar_base_">
                        <div class="rfm_rate_indi" id="rfm_result_indi_f_base"></div>
                        <div class="bar_base bar_base_f inline" id="bar_base_f">
                          <div class="bar bar_0 inline"></div>
                          <div class="bar bar_1 inline"></div>
                          <div class="bar bar_2 inline"></div>
                          <div class="bar bar_3 inline"></div>
                          <div class="bar bar_4 inline"></div>
                        </div>
                        <div class="result_base" id="rfm_result_f_base">
                        </div>
                      </div>
                      <div class="bar_base_">
                        <div class="rfm_rate_indi" id="rfm_result_indi_m_base"></div>
                        <div class="bar_base bar_base_m inline" id="bar_base_m">
                          <div class="bar bar_0 inline"></div>
                          <div class="bar bar_1 inline"></div>
                          <div class="bar bar_2 inline"></div>
                          <div class="bar bar_3 inline"></div>
                          <div class="bar bar_4 inline"></div>
                        </div>
                        <div class="result_base" id="rfm_result_m_base">
                        </div>
                      </div>
                    </div>
                    <div class="btn_base" style="text-align:right;">
                      <button id="rfm_query_btn">適用する</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_2x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">クラスター分布</div>
              <div class="content _rfm_">
                <div class="base">
                  <div class="table_base table_base2 cell_table">
                    <table id="rfm_cluster_table_cell">
                    </table>
                  </div>
                  <div class="table_base table_base2">
                    <table id="rfm_cluster_table">
                    </table>
                  </div>
                  <div class="btn_base desktop_elm" style="text-align:right;">
                    <button id="rfm_cluster_excel_btn"><i class="fas fa-file-excel"></i> 顧客一覧.xlsx</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_2x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">RF分布</div>
              <div class="content _rfm_">
                <div class="base">
                  <div class="table_base table_base2 cell_table">
                    <table id="rfm_rf_table_cell">
                    </table>
                  </div>
                  <div class="table_base table_base2">
                    <table id="rfm_rf_table">
                    </table>
                  </div>
                  <div class="btn_base desktop_elm" style="text-align:right;">
                    <button id="rfm_rf_excel_btn"><i class="fas fa-file-excel"></i> 顧客一覧.xlsx</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell cell_2x1 inline">
            <div class="box cell_link">
              <div class="cell_title text_overflow">RFM分布</div>
              <div class="content _rfm_">
                <div class="base">
                  <div class="table_base table_base2 cell_table">
                    <table class="inline" id="rfm_rfm1_table_cell">
                    </table>
                    <table class="inline" id="rfm_rfm2_table_cell">
                    </table>
                    <table class="inline" id="rfm_rfm3_table_cell">
                    </table>
                    <table class="inline" id="rfm_rfm4_table_cell">
                    </table>
                    <table class="inline" id="rfm_rfm5_table_cell">
                    </table>
                  </div>
                  <div class="table_base table_base2">
                    <table id="rfm_rfm_table">
                    </table>
                  </div>
                  <div class="btn_base desktop_elm" style="text-align:right;">
                    <button id="rfm_rfm_excel_btn"><i class="fas fa-file-excel"></i> 顧客一覧.xlsx</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="table_base" style="display:none;">
        <div class="table_table_base" id="decyle_table_bases">
          <table id="decyle_table_summary" data-sheet-name="デシル別顧客概要"></table>
          <div id="decyle_table_part_base">
          </div>
        </div>
        <div class="table_table_base">
          <table id="repeat_excel_table" data-sheet-name="抽出した顧客"></table>
        </div>
        <div class="table_table_base" id="rfm_cluster_table_bases">
          <table id="rfm_cluster_table_summary" data-sheet-name="クラスタ別顧客概要"></table>
          <div id="rfm_cluster_table_part_base">
          </div>
        </div>
        <div class="table_table_base" id="rfm_rf_table_bases">
          <table id="rfm_rf_table_summary" data-sheet-name="RFランク別顧客概要"></table>
          <div id="rfm_rf_table_part_base">
          </div>
        </div>
        <div class="table_table_base" id="rfm_rfm_table_bases">
          <table id="rfm_rfm_table_summary" data-sheet-name="RFMランク別顧客概要"></table>
          <div id="rfm_rfm_table_part_base">
          </div>
        </div>
      </div>
      `
    );

  }
  const desc_static_sections = () => {
    const desc_trend = () => {
      let objs = data.data.trend;

      let data_0_arr = [];
      let data_1_arr = [];
      let data_2_arr = [];
      let data_3_arr = [];
      let data_4_arr = [];

      let tpl = [];

      const desc_leveling = () => {
        pa.forEach((label,idx) => {
          tpl.push(convert_pl(label,idx,pt));

          let result = objs.filter(({period}) => period == label);

          let data_0 = result.sum_val(`data_0`);
          let data_1 = result.sum_val(`data_1`);
          let data_2 = result.sum_val(`data_2`);
          let data_3 = result.sum_val(`data_3`);
          let data_4 = data_1 - data_2;

          data_0_arr.push(data_0);
          data_1_arr.push(data_1);
          data_2_arr.push(data_2);
          data_3_arr.push(data_3);
          data_4_arr.push(data_4);
        });
      }
      const desc_graph = () => {
        let label_arr = ["来院数","期間内再来","月別純患数","純患数","新患数"];

        let graph_data = [{
          label:"来院数",
          data:data_0_arr,
          borderColor:"orange",
          hidden:true,
          fill:false,
          borderWidth:2,
          lineTension:0.2
        },{
          label:"期間内再来",
          data:data_4_arr,
          borderColor:"red",
          fill:false,
          borderWidth:2,
          lineTension:0.2
        },{
          label:"月別純患数",
          data:data_1_arr,
          borderColor:"rgba(54,183,235,1)",
          borderWidth:2,
          fill:false,
          lineTension:0.2
        },{
          label:"純患数",
          data:data_2_arr,
          backgroundColor:"rgb(18,83,164)",
          borderColor:"rgb(18,83,164)",
          fill:"4",
          lineTension:0.2
        },{
          label:"新患数",
          data:data_3_arr,
          backgroundColor:"rgb(32,210,200)",
          borderColor:"rgb(32,210,200)",
          fill:true,
          lineTension:0.2
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
                return `${label_arr[idx]} ${amount.toLocaleString()}人`;
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
    const desc_segment = () => {
      let _objs = data.data.customer;
      const desc_geneder = () => {
        let data_0_arr = [];
        let data_1_arr = [];
        let data_2_arr = [];
        let data_3_arr = [];
        let data_4_arr = [];
        let data_5_arr = [];
        let data_6_arr = [];
        let data_7_arr = [];

        let tpl = [];

        const desc_leveling = () => {
          let _males = _objs.filter(({gender}) => gender == 1);
          let _females = _objs.filter(({gender}) => gender == 2);

          for (let i = 1;i <= 100;i++) {
            tpl.push(i);

            let _male = _males.filter(({age}) => age == i);
            let _female = _females.filter(({age}) => age == i);
            let _m_new = _male.filter(({min_rep}) => min_rep == 1);
            let _f_new = _female.filter(({min_rep}) => min_rep == 1);
            let _m_count = _male.sum_val(`count`);
            let _f_count = _female.sum_val(`count`);
            let _m_cup = _male.sum_val(`data_0`).to_devide(_m_count);
            let _f_cup = _female.sum_val(`data_0`).to_devide(_f_count);

            data_0_arr.push(_male.length);
            data_1_arr.push(_female.length * -1);
            data_2_arr.push(_m_new.length);
            data_3_arr.push(_f_new.length * -1);
            data_4_arr.push(_m_cup);
            data_5_arr.push(_f_cup * -1);
            data_6_arr.push(_m_count);
            data_7_arr.push(_f_count * -1);
          }
        }
        const desc_male = () => {
          let graph_data = [{
            type:"LineWithLine",
            label:"客単価",
            data:data_4_arr,
            backgroundColor:`#fff`,
            borderColor:`rgba(54,100,180,1)`,
            yAxisID: "y-axis-1",
            borderWidth:1,
            fill:false,
            cubicInterpolationMode: 'monotone',
            lineTension : 0
          },{
            label:"来院数",
            data:data_6_arr,
            hidden:true,
            backgroundColor:`rgba(54,100,180,.25)`,
            borderWidth:0
          },{
            label:"男性純患数",
            data:data_0_arr,
            backgroundColor:`rgba(54,100,180,.5)`,
            borderWidth:0
          },{
            label:"新患",
            data:data_2_arr,
            backgroundColor:`rgba(54,100,180,1)`,
            borderWidth:0
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
                type: 'linear',
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
                  maxTicksLimit:5,
                  callback: function(label, index, labels) {
                    if (label < 0) return `${(label * -1).str_jp()}`;
                    else return label.str_jp();
                  }
                },
              },{
                id:"y-axis-1",
                type: 'linear',
                position: "right",
                gridLines: {
                  display:false,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:5,
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
                  maxTicksLimit:15,
                  callback: function(label, index, labels) {
                    return `${label}歳`;
                  }
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
                  return `男性 ${index + 1}歳`;
                },
                label:function(t,d) {
                  let index = t.index;
                  let idx = t.datasetIndex;
                  let amount = t.yLabel;
                  amount = amount < 0 ? amount * -1 : amount;
                  let ar = ["客単価","来院数","純患数","新患"];
                  let dar = ["円","回","人","人"];
                  return `${ar[idx]} ${amount.str_jp()}${dar[idx]}`;
                }
              }
            }
          }
          male_bar.data = {
            labels:tpl,
            datasets:graph_data
          };
          male_bar.options = graph_option;
          male_bar.update();
        }
        const desc_female = () => {
          let graph_data = [{
            type:"LineWithLine",
            label:"客単価",
            data:data_5_arr,
            backgroundColor:`#fff`,
            borderColor:`rgb(242,100,100)`,
            yAxisID: "y-axis-1",
            borderWidth:1,
            fill:false,
            cubicInterpolationMode: 'monotone',
            lineTension : 0
          },{
            label:"来院数",
            data:data_7_arr,
            hidden:true,
            backgroundColor:`rgba(242,100,100,.25)`,
            borderWidth:0
          },{
            label:"女性純患数",
            data:data_1_arr,
            backgroundColor:`rgba(242,100,100,.5)`,
            borderWidth:0
          },{
            label:"新患",
            data:data_3_arr,
            backgroundColor:`rgb(242,100,100)`,
            borderWidth:0
          }];
          let graph_option = {
            maintainAspectRatio:true,
            responsive: true,
            legend:{
              position:`bottom`,
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
                type: 'linear',
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
                  maxTicksLimit:5,
                  callback: function(label, index, labels) {
                    if (label < 0) return `${(label * -1).str_jp()}`;
                    else return label.str_jp();
                  }
                },
              },{
                id:"y-axis-1",
                type: 'linear',
                position: "right",
                gridLines: {
                  display:false,
                  drawBorder: false,
                  zeroLineColor:"#eee",
                  color:"#eee"
                },
                ticks: {
                  autoSkip: true,
                  fontSize:8,
                  maxTicksLimit:5,
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
                ticks: {display:false,},
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
                  return `女性 ${index + 1}歳`;
                },
                label:function(t,d) {
                  let index = t.index;
                  let idx = t.datasetIndex;
                  let amount = t.yLabel;
                  amount = amount < 0 ? amount * -1 : amount;
                  let ar = ["客単価","来院数","純患数","新患"];
                  let dar = ["円","回","人","人"];
                  return `${ar[idx]} ${amount.str_jp()}${dar[idx]}`;
                }
              }
            }
          }
          female_bar.data = {
            labels:tpl,
            datasets:graph_data
          };
          female_bar.options = graph_option;
          female_bar.update();
        }

        desc_leveling();
        desc_male();
        desc_female();
      }
      const desc_scatter = () => {
        let data_arr = [];
        const desc_leveling = () => {
          let obj_arr = [];

          let ages_arr = [
            {s:1,e:19},
            {s:20,e:34},
            {s:35,e:49},
            {s:50,e:65},
            {s:65,e:74},
            {s:75,e:100}
          ];
          for (let i = 0;i < ages_arr.length;i++) {
            let cell = _objs.filter(({age}) => age >= ages_arr[i].s && age <= ages_arr[i].e);
            let all = cell.sum_val(`data_0`);
            let count = cell.sum_val(`count`);
            let cup = all.to_devide(count);
            let cuc = count.to_Perate(cell.length);
            obj_arr.push({x:cup,y:cuc});
          }
          data_arr.push({
            label:"当期",
            data: obj_arr,
            pointRadius:4,
            pointHoverRadius:4,
            borderColor:`rgba(54,100,180,1)`,
            backgroundColor:`rgba(54,100,180,1)`,
            borderWidth:1,
            fill:false,
            showLine: true
          });
        }
        const desc_graph = () => {
          let graph_data = data_arr;
          let graph_option = {
            title: {display:false},
            legend:{labels:{display:false,fontSize:10,boxWidth:24}},
            scales: {
              xAxes: [{
                scaleLabel: {
                  display:true,
                  fontSize:10,
                  labelString: '客単価'
                },
                ticks: {
                  fontSize:8,
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
                  labelString: '平均来院数'
                },
                ticks: {
                  minRotation:0,
                  maxRotation:0,
                  fontSize:8,
                  stepSize:1,
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
                  let ar = [
                    "未成年(1~19歳)",
                    "成人前期(20~34歳)",
                    "成人中期(35~49歳)",
                    "成人後期(50~64歳)",
                    "前期高齢(65~74歳)",
                    "後期高齢(75~100歳)"
                  ];
                  return ar[index];
                },
                label:function(t,d) {
                  let index = t.index;
                  let id = t.datasetIndex;
                  let amount = t.xLabel;
                  let menu = t.yLabel;
                  return `客単価 ¥${amount.toLocaleString()} 平均来院数 ${menu.toLocaleString()}回`;
                }
              }
            }
          }
          cup_scatter.data = {datasets:graph_data};
          cup_scatter.options = graph_option;
          cup_scatter.update();
        }

        desc_leveling();
        desc_graph();
      }
      const desc_bubble = () => {
        let _objs = data.data.summary;

        let data_arr = [];
        let data_0_arr = [];
        let data_1_arr = [];
        let data_2_arr = [];
        let data_3_arr = [];
        let data_4_arr = [];
        let data_5_arr = [];

        let label_arr = [
          "1回目来院",
          "2~4回目",
          "5~7回目",
          "8~10回目",
          "11~19回目",
          "20回目~"
        ];
        let color_arr = [
          "rgb(40,255,255)",
          "rgb(54,183,235)",
          "rgb(255,165,150)",
          "rgb(255,165,0)",
          "rgb(255,45,0)",
          "rgb(200,0,0)",
        ];

        const desc_leveling = () => {
          let male_arr = [];
          let female_arr = [];

          let obj_arr = [
            _objs.filter(({count_num}) => count_num == 1),
            _objs.filter(({count_num}) => count_num >= 2 && count_num <= 4),
            _objs.filter(({count_num}) => count_num >= 5 && count_num <= 7),
            _objs.filter(({count_num}) => count_num >= 8 && count_num <= 10),
            _objs.filter(({count_num}) => count_num >= 11 && count_num <= 19),
            _objs.filter(({count_num}) => count_num >= 11)
          ];

          let max = obj_arr.map((cell) => {return cell.sum_val(`data_1`);}).max_val(``);

          for (let i = 0;i < obj_arr.length;i++) {
            let objs = obj_arr[i];
            let all = objs.sum_val(`data_0`);
            let count = objs.sum_val(`data_1`);
            let hour = objs.sum_val(`data_2`);
            let cup = all.to_devide(count);
            let hup = all.to_devide(hour);

            let size_per = count.to_Perate(max);
            data_arr.push({
              label:`${label_arr[i]}`,
              data: [{x:cup,y:hup,r:2+30*size_per}],
              backgroundColor:color_arr[i],
              borderColor:color_arr[i]
            });
          }
        }
        const desc_graph = () => {
          let graph_data = data_arr;
          let graph_option = {
            title: {display:false},
            legend:{labels:{fontSize:10,boxWidth:16}},
            scales: {
              xAxes: [{
                scaleLabel: {
                  display:true,
                  fontSize:10,
                  labelString: '客単価'
                },
                ticks: {
                  fontSize:8,
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
                  labelString: '時間単価'
                },
                ticks: {
                  minRotation:0,
                  maxRotation:0,
                  fontSize:8,
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
                  return label_arr[data_index];
                },
                label:function(t,d) {
                  let data_index = t.datasetIndex;
                  let index = t.index;
                  let cup = t.xLabel;
                  let hup = t.yLabel;
                  return `客単価 ¥${cup.toLocaleString()} 時間単価 ¥${hup.toLocaleString()}`;
                }
              }
            }
          }
          bubble_chart.data = {datasets:graph_data};
          bubble_chart.options = graph_option;
          bubble_chart.update();
        }

        desc_leveling();
        desc_graph();

        $(document).off('change','#bubble_range').on('change','#bubble_range',function() {
          let index = $('#bubble_range').prop('value');
          for (let i = 0;i < 6;i++) {
            eval(`bubble_chart.data.datasets[${i}].data = [data_${i}_arr[${index}]]`);
          }
          bubble_chart.update();
        });
      }
      const desc_count = () => {
        let data_0_arr = [];
        let data_1_arr = [];

        let objs = data.data.summary;
        let tpl = [];
        objs.forEach((cell,idx) => {
          tpl.push(`${idx+1}回`);

          let data_0 = cell.data_0;
          let data_1 = cell.data_1;

          data_0_arr.push(data_0);
          data_1_arr.push(data_0.to_devide(data_1));
        });

        let graph_data = [{
          type:"LineWithLine",
          label:"客単価",
          data:data_1_arr,
          backgroundColor:`rgba(54,100,180,0)`,
          borderColor:"rgba(54,100,180,1)",
          borderWidth:2,
          pointRadius:0,
          pointBackgroundColor:"#fff",
          fill:false,
          yAxisID: "y-axis-1",
          cubicInterpolationMode: 'monotone',
          lineTension: 0
        },{
          label:"総合売上",
          data:data_0_arr,
          backgroundColor:`rgba(255,180,0,.1)`,
          borderColor:`rgba(255,180,0,1)`,
          borderWidth:1,
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
                let ar = ["客単価","総合売上"];
                return `${ar[idx]} ¥${amount.toLocaleString()}`;
              }
            }
          }
        }
        count_chart.data = {
          labels:tpl,
          datasets:graph_data
        };
        count_chart.options = graph_option;
        count_chart.update();
      }
      const desc_sales_per = () => {
        let data = _objs.sum_val('data_0');
        let count = _objs.sum_val('count');

        let at0 = data;
        let at1 = data.to_devide(_objs.length);
        let at2 = data.to_devide(count);
        let at3 = _objs.min_val(`data_0`);
        let at4 = _objs.median_val(`data_0`);
        let at5 = _objs.max_val(`data_0`);

        $('#sales_per').html(
          `
          <div class="row">
            <div class="indi"><i class="fas fa-yen-sign"></i> 総合売上</div>
            <div class="content">
              <div class="amount">¥${at0.toLocaleString()}</div>
            </div>
          </div>
          <div class="row">
            <div class="indi"><i class="fas fa-user"></i> 1顧客あたり</div>
            <div class="content">
              <div class="amount">¥${at1.toLocaleString()}</div>
            </div>
          </div>
          <div class="row">
            <div class="indi"><i class="fas fa-users"></i> 1来院あたり</div>
            <div class="content">
              <div class="amount">¥${at2.toLocaleString()}</div>
            </div>
          </div>
          <div class="row">
            <div class="indi"><i class="fas fa-arrow-to-bottom"></i> 最低</div>
            <div class="content">
              <div class="amount">¥${at3.toLocaleString()}</div>
            </div>
          </div>
          <div class="row">
            <div class="indi"><i class="fad fa-ellipsis-h"></i> 中央値</div>
            <div class="content">
              <div class="amount">¥${at4.toLocaleString()}</div>
            </div>
          </div>
          <div class="row">
            <div class="indi"><i class="fas fa-arrow-to-top"></i> 最大</div>
            <div class="content">
              <div class="amount">¥${at5.toLocaleString()}</div>
            </div>
          </div>
          `
        );
      }
      const desc_plot = () => {
        let data_0_arr = [];
        let data_1_arr = [];
        let data_2_arr = [];
        let data_3_arr = [];

        _objs.forEach((cell) => {
          data_0_arr.push(cell.data_0);
          data_1_arr.push(cell.data_1);
          data_2_arr.push(cell.data_2);
          data_3_arr.push(cell.data_3);
        });
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
                min:0,
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
        sales_boxplot.data = {
          labels:["総合売上","保険請求","保険負担","自費売上"],
          datasets:graph_data,
        };
        sales_boxplot.options = graph_option;
        sales_boxplot.update();
      }

      desc_geneder();
      desc_scatter();
      desc_bubble();
      desc_count();
      desc_sales_per();
      desc_plot();
    }
    const desc_like_menu = () => {
      let sum_data_0 = data.data.all_menu.sum_val('data_0');
      let sum_data_1 = data.data.all_menu.sum_val('data_1');

      const desc_gender = () => {
        let _objs = data.data.genlm;
        const desc_ = (st) => {
          let ap = ``;

          let result = _objs.filter(({obj_id}) => obj_id == st+1);
          for (let i = 0;i < 10;i++) {
            let rslt = result.filter(({order_id}) => order_id == i+1);

            let name = rslt.exist_val() ? rslt[0].pr_name : `no name`;
            let data_0 = rslt.sum_val('data_0');
            let data_1 = rslt.sum_val('data_1');

            let cup = data_1.to_devide(data_0);

            let rate_0 = data_0.to_rate(sum_data_0);
            let rate_1 = data_1.to_rate(sum_data_1);

            ap +=
            `
            <tr>
              <th class="number">${i+1}</th>
              <th>${name}</th>
              <td>
                <div class="amount text_overflow">
                  ${data_0.toLocaleString()}
                  <span class="percent">${rate_0}%</span>
                </div>
                <div class="bb" style="width:${rate_0}%;"></div>
              </td>
              <td>
                <div class="amount text_overflow">
                  ¥${data_1.toLocaleString()}
                  <span class="percent">${rate_1}%</span>
                </div>
                <div class="bb" style="width:${rate_1}%;"></div>
              </td>
              <td>
                <div class="amount text_overflow">¥${cup.toLocaleString()}</div>
              </td>
            </tr>`;
          }

          $('#genlm_table').html(
            `
            <thead>
              <th></th>
              <th></th>
              <th>施術数</th>
              <th>売上</th>
              <th>単価</th>
            </thead>
            <tbody>
              ${ap}
            </tbody>
            `
          );
        }

        desc_(0);
        $(document).off('input','input[name="genlm_input_"]').on('input','input[name="genlm_input_"]',function() {
          let index = $('input[name="genlm_input_"]').index(this);
          desc_(index);
        });
      }
      const desc_generation = () => {
        let _objs = data.data.genelm;

        const desc_ = (st) => {
          let ap = ``;

          let result = _objs.filter(({obj_id}) => obj_id == st);
          for (let i = 0;i < 10;i++) {
            let rslt = result.filter(({order_id}) => order_id == i+1);

            let name = rslt.exist_val() ? rslt[0].pr_name : `no name`;
            let data_0 = rslt.sum_val('data_0');
            let data_1 = rslt.sum_val('data_1');

            let cup = data_1.to_devide(data_0);

            let rate_0 = data_0.to_rate(sum_data_0);
            let rate_1 = data_1.to_rate(sum_data_1);

            ap +=
            `
            <tr>
              <th class="number">${i+1}</th>
              <th>${name}</th>
              <td>
                <div class="amount text_overflow">
                  ${data_0.toLocaleString()}
                  <span class="percent">${rate_0}%</span>
                </div>
                <div class="bb" style="width:${rate_0}%;"></div>
              </td>
              <td>
                <div class="amount text_overflow">
                  ¥${data_1.toLocaleString()}
                  <span class="percent">${rate_1}%</span>
                </div>
                <div class="bb" style="width:${rate_1}%;"></div>
              </td>
              <td>
                <div class="amount text_overflow">¥${cup.toLocaleString()}</div>
              </td>
            </tr>
            `;
          }

          $('#genelm_table').html(
            `
            <thead>
              <th></th>
              <th></th>
              <th>施術数</th>
              <th>売上</th>
              <th>単価</th>
            </thead>
            <tbody>
              ${ap}
            </tbody>
            `
          );
        }

        desc_(2);
        $(document).off('input','input[name="genelm_input_"]').on('input','input[name="genelm_input_"]',function() {
          let index = $('input[name="genelm_input_"]').index(this);
          desc_(index);
        });
      }
      const desc_geneder = () => {
        let _objs = data.data.genederlm;

        const desc_ = (st) => {
          let ap = ``;

          if (st == 0) {
            for (let i = 0;i < 10;i++) {
              let result = _objs.filter(({obj_id}) => obj_id == i);
              let app = ``;

              for (let idx = 0;idx < 5;idx++) {
                let rslt = result.filter(({order_id}) => order_id == idx+1);

                let name = rslt.exist_val() ? rslt[0].pr_name : `no name`;
                let pr_id = rslt.exist_val() ? rslt[0].pr_id : 0;

                let data_0 = rslt.sum_val('data_0');
                let rate_0 = data_0.to_rate(sum_data_0);

                app +=
                `
                <td name="geneder_td_" class="geneder_td_${pr_id}">
                  <div class="name">${name}</div>
                  <div class="amount text_overflow">
                    <span class="percent">${rate_0}%</span>
                  </div>
                  <div class="bb" style="width:${rate_0}%;"></div>
                </td>
                `;
              }
              ap +=
              `
              <tr>
                <th>${genderna[i]}</th>
                ${app}
              </tr>
              `;
            }

            $('#genederlm_table').html(
              `
              <thead>
                <th></th>
                <th>1位</th>
                <th>2位</th>
                <th>3位</th>
                <th>4位</th>
                <th>5位</th>
              </thead>
              <tbody>
                ${ap}
                <tr>
                  <th class="th_long" colspan="6"></th>
                </tr>
                <tr>
                  <th id="genederlm_summary_menu_name">-</th>
                  <td colspan="5" id="genederlm_summary_info" style="text-align:left;">-</td>
                </tr>
              </tbody>
              `
            );

            const desc_td_click = (mid) => {
              $(`td[name="geneder_td_"]`).removeClass('td_hover');
              $(`.geneder_td_${mid}`).addClass('td_hover');

              (() => {
                let result = _objs.filter(({pr_id}) => pr_id == mid);
                let name = result.length >= 1 ? result[0].pr_name : `no name`;

                let top_count = result.length;
                let rate_top_count = top_count.to_rate(50);

                let data_0 = result.sum_val('data_0');
                let rate_0 = data_0.to_rate(sum_data_0);

                let data_1 = result.sum_val('data_1');
                let rate_1 = data_1.to_rate(sum_data_1);

                $('#genederlm_summary_menu_name').html(name);
                $('#genederlm_summary_info').html(
                  `
                  <div class="amount">
                    上位を占める割合 : ${top_count} <span>(${rate_top_count}%)</span>
                    総施術数 : ${data_0.toLocaleString()} <span>(${rate_0}%)</span>
                    売上 : ${data_1.toLocaleString()} <span>(${rate_1}%)</span>
                  </div>
                  `
                );
              })();
            }

            let first_id = $('#genederlm_table td:eq(0)').prop('class').split('_')[2];
            desc_td_click(first_id);
            $(document).off('click','td[name="geneder_td_"]').on('click','td[name="geneder_td_"]',function() {
              let pr_id = $(this).prop('class').split('_')[2];
              desc_td_click(pr_id);
            });
          } else {
            for (let i = 0;i < 10;i++) {
              let result = _objs.filter(({obj_id}) => obj_id == i);
              let app = ``;

              for (let idx = 0;idx < 5;idx++) {
                let rslt = result.filter(({order_id}) => order_id == idx+1);

                let name = rslt.exist_val() ? rslt[0].pr_name : `no name`;
                let pr_id = rslt.exist_val() ? rslt[0].pr_id : 0;

                let data = rslt.sum_val(`data_${st-1}`);
                let rate = data.to_rate(eval(`sum_data_${st-1}`));

                app +=
                `
                <td name="geneder_td_" class="geneder_td_${pr_id}">
                  <div class="amount text_overflow">
                    <span class="ttl">${name}</span>

                    ${data.toLocaleString()}
                    <div class="inline" style="color:#ccc;">(${rate}%)</div>
                  </div>
                  <div class="bb" style="width:${rate}%;"></div>
                </td>
                `;
              }

              ap +=
              `
              <tr>
                <th>${genderna[i]}</th>
                ${app}
              </tr>
              `;
            }

            $('#genederlm_table').html(
              `
              <thead>
                <th></th>
                <th>1位</th>
                <th>2位</th>
                <th>3位</th>
                <th>4位</th>
                <th>5位</th>
              </thead>
              <tbody>
                ${ap}
              </tbody>
              `
            );
          }

        }

        desc_(0);
        $(document).off('input','input[name="genederlm_input_"]').on('input','input[name="genederlm_input_"]',function() {
          let index = $('input[name="genederlm_input_"]').index(this);
          desc_(index);
        });
      }
      const desc_menu_tree = () => {
        let _objs = data.data.action;
        let menu_obj = data.data.mn;
        let sum_count = data.data.trend.sum_val('data_0');

        let ap = ``;
        _objs.forEach((cell,idx) => {
          let app = ``;
          let menu_trend_arr = cell.menu_trend.split(',');

          let rate = cell.count.to_rate(sum_count);

          for (let i = 0;i < 5;i++) {
            let mid = menu_trend_arr[i];
            let result = menu_obj.filter(({obj_id}) => obj_id == mid);

            let name = ``;
            if (mid == undefined) {
              name = `なし`;
            } else if (!result.exist_val()) {
              name = `保険メニュー`;
            } else {
              name = result[0].obj_name;
            }

            app += `<td>${name}</td>`;
          }

          ap +=
          `
          <tr>
            <th class="number">${idx+1}</th>
            <th>
              <div class="amount text_overflow">
                ${cell.count}回
                <div class="inline" style="color:#aaa;">(${rate}%)</div>
              </div>
              <div class="bb" style="width:${rate}%;"></div>
            </th>
            ${app}
          </tr>
          `;
        });

        $('#action_table').html(
          `
          <thead>
            <tr>
              <th></th>
              <th>該当来院数</th>
              <th>1品目</th>
              <th>2品目</th>
              <th>3品目</th>
              <th>4品目</th>
              <th>5品目</th>
            </tr>
          </thead>
          <tbody>${ap}</tbody>
          `
        );
      }

      desc_gender();
      desc_generation();
      desc_geneder();
      desc_menu_tree();
    }
    const desc_map = () => {
      let _objs = data.data.customer;
      const desc_label = (index) => {
        let ap = ``;
        let imna = [];
        let arr = [];
        if (index == 0) {
          imna = ["w","b","y","r"];
          arr = ["~19歳","20~34歳","35~64歳","65歳~"];
        } else if (index == 1) {
          imna = ["b","r"];
          arr = ["男性","女性"];
        } else if (index == 2) {
          imna = ["w","b","y","r"];
          arr = ["1,2回","3~5回","7~9回","10回~"];
        } else if (index == 3) {
          imna = ["w","b","y","r"];
          arr = ["自費売上上位0~25%","~50%","~75%","~100%"];
        }

        for (let i = 0;i < arr.length;i++) {
          ap +=
          `
          <input type="checkbox" name="map_segment_" id="map_segment_${i}" checked>
          <label for="map_segment_${i}">
            <img class="inline" src="/assets/man_100${imna[i]}.png">
            ${arr[i]}
          </label>
          `;
        }

        $('#msti_base').html(ap);
      }
      const desc_leveling = (index) => {
        if (index == 0) {
          let objs_0 = _objs.filter(({age}) => age <= 19);
          let objs_1 = _objs.filter(({age}) => age >= 20 && age <= 34);
          let objs_2 = _objs.filter(({age}) => age >= 35 && age <= 64);
          let objs_3 = _objs.filter(({age}) => age >= 65);

          objs_0.forEach((cell) => {cell.group = 0;});
          objs_1.forEach((cell) => {cell.group = 1;});
          objs_2.forEach((cell) => {cell.group = 2;});
          objs_3.forEach((cell) => {cell.group = 3;});
        } else if (index == 1) {
          let objs_0 = _objs.filter(({gender}) => gender == 1);
          let objs_1 = _objs.filter(({gender}) => gender == 2);
          objs_0.forEach((cell) => {cell.group = 0;});
          objs_1.forEach((cell) => {cell.group = 1;});
        } else if (index == 2) {
          let objs_0 = _objs.filter(({count}) => count <= 2);
          let objs_1 = _objs.filter(({count}) => count >= 3 && count <= 5);
          let objs_2 = _objs.filter(({count}) => count >= 7 && count <= 9);
          let objs_3 = _objs.filter(({count}) => count >= 10);

          objs_0.forEach((cell) => {cell.group = 0;});
          objs_1.forEach((cell) => {cell.group = 1;});
          objs_2.forEach((cell) => {cell.group = 2;});
          objs_3.forEach((cell) => {cell.group = 3;});
        } else if (index == 3) {
          let max = _objs.sum_val(`data_2`);
          let step = 0;
          _objs.forEach((cell) => {
            step += cell.data_2;
            let rate = step.to_perate(max);
            if (rate <= 25) {
              cell.group = 0;
            } else if (rate <= 50) {
              cell.group = 1;
            } else if (rate <= 75) {
              cell.group = 2;
            } else {
              cell.group = 3;
            }

          });
        }
        desc_mapping(index);
      }
      const desc_mapping = (type) => {
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

        let co = clinic_objs;
        let cuo = _objs;

        let clinic_filter_arr = [];
        $('#clinic_filter_base').html(``);
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
            addr1:cell.addr1,
            addr2:cell.addr2,
            name:`${user_name==MSD_smn?`患者${cell.c_ptno}`:cell.c_name}`,
            geneder:gro[cell.geneder_id].name,
            staff_id:cell.staff_id,
            clinic_id:cell.clinic_id,
            data_0:cell.data_0,
            data_1:cell.data_1,
            data_2:cell.data_2,
            data_3:cell.data_3,
            data_4:cell.count,
            group:cell.group
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
        let user_3_arr = [],user_3_ar = [];
        let clinic_infoWindow = [];
        let user_infoWindow = [];
        let marker_group_0;
        let marker_group_1;
        let marker_group_2;
        let marker_group_3;

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
            styles:[
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
          let sum_data_4 = cuo.sum_val(`count`);

          for (let i = 0; i < clinic_arr.length; i++) {
            let result = cuo.filter(({clinic_id}) => clinic_id == clinic_arr[i].id);
            let data_0   =   result.sum_val(`data_0`);
            let data_1   =   result.sum_val(`data_1`);
            let data_2   =   result.sum_val(`data_2`);
            let data_3   =   result.sum_val(`data_3`);
            let data_4   =   result.sum_val(`count`);

            let rate_amount  =      (result.length).to_perate(amount_total);
            let rate_0       =      data_0.to_perate(sum_data_0);
            let rate_1       =      data_1.to_perate(sum_data_1);
            let rate_2       =      data_2.to_perate(sum_data_2);
            let rate_3       =      data_3.to_perate(sum_data_3);
            let rate_4       =      data_4.to_perate(sum_data_4);

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
                保険請求額 : ¥${data_1.str_jp()}(${rate_1}%)
                <div style="height:4px;background-color:#ddd;">
                  <div style="width:${rate_1}%;height:4px;background-color:rgba(69,165,255,1);"></div>
                </div>
                保険負担金 : ¥${data_2.str_jp()}(${rate_2}%)
                <div style="height:4px;background-color:#ddd;">
                  <div style="width:${rate_2}%;height:4px;background-color:rgba(69,165,255,1);"></div>
                </div>
                自費売上 : ${data_3.str_jp()}(${rate_3}%)
                <div style="height:4px;background-color:#ddd;">
                  <div style="width:${rate_3}%;height:4px;background-color:rgba(69,165,255,1);"></div>
                </div>
                総来院数 : ${data_4.str_jp()}(${rate_4}%)
                <div style="height:4px;background-color:#ddd;">
                  <div style="width:${rate_4}%;height:4px;background-color:rgba(69,165,255,1);"></div>
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

          let data_0_image = type == 1 ? `10` : `40`;
          let data_1_image = type == 1 ? `30` : `10`;
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
                来院回数:${user_arr[i].data_4.str_jp()}回
                <br>
                総売:${user_arr[i].data_0.str_jp()}円
                <br>
                保険請求額:${user_arr[i].data_1.str_jp()}円
                <br>
                保険負担金:${user_arr[i].data_2.str_jp()}円
                <br>
                自費売上:${user_arr[i].data_3.str_jp()}円
              `
            });

            let unm = 0;
            let num = 0;
            if (user_arr[i].group == 0) {
              unm = 0;
              user_0_ar.push(user_arr[i]);
              user_0_arr.push(new google.maps.Marker({
                position: markerLatLng,
                map: map,
                icon:`/assets/man_${data_0_image}.png`
              }));
              num = user_0_arr.length - 1;

              user_0_arr[num].addListener('click', function() {
                desc_clear_close(() => {
                  user_infoWindow[i].open(map, user_0_arr[num]);
                });
              });
            } else if (user_arr[i].group == 1) {
              unm = 1;
              user_1_ar.push(user_arr[i]);
              user_1_arr.push(new google.maps.Marker({
                position: markerLatLng,
                map: map,
                icon:`/assets/man_${data_1_image}.png`
              }));
              num = user_1_arr.length - 1;

              user_1_arr[num].addListener('click', function() {
                desc_clear_close(() => {
                  user_infoWindow[i].open(map, user_1_arr[num]);
                });
              });
            } else if (user_arr[i].group == 2) {
              unm = 2;
              user_2_ar.push(user_arr[i]);
              user_2_arr.push(new google.maps.Marker({
                position: markerLatLng,
                map: map,
                icon:"/assets/man_20.png"
              }));
              num = user_2_arr.length - 1;

              user_2_arr[num].addListener('click', function() {
                desc_clear_close(() => {
                  user_infoWindow[i].open(map, user_2_arr[num]);
                });
              });
            } else if (user_arr[i].group == 3) {
              unm = 3;
              user_3_ar.push(user_arr[i]);
              user_3_arr.push(new google.maps.Marker({
                position: markerLatLng,
                map: map,
                icon:"/assets/man_30.png"
              }));
              num = user_3_arr.length - 1;

              user_3_arr[num].addListener('click', function() {
                desc_clear_close(() => {
                  user_infoWindow[i].open(map, user_3_arr[num]);
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
          marker_group_3 = new MarkerClusterer(map, user_3_arr,{
            minimumClusterSize:100,
            styles:[
              {textColor: 'white',url: '/assets/group_3.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_3.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_3.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_3.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_3.png',height:65,width:66},
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
          user_3_arr.forEach((cell) => {cell.setVisible(false);});

          let bool_0 = $('#map_segment_0').prop('checked');
          let bool_1 = $('#map_segment_1').prop('checked');
          let bool_2 = $('#map_segment_2').prop('checked');
          let bool_3 = $('#map_segment_3').prop('checked');

          let remark_0_arr = [];
          let remark_1_arr = [];
          let remark_2_arr = [];
          let remark_3_arr = [];

          let sum = 0;
          let sum_0 = 0;
          let sum_1 = 0;
          let sum_2 = 0;
          let sum_3 = 0;

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
            for (let i = 0;i < user_3_arr.length;i++) {
              if (bool_3) {
                user_3_arr[i].setVisible(bool_3);
                remark_3_arr.push(user_3_arr[i]);
                sum += 1;
                sum_3 += 1;
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
            for (let i = 0;i < user_3_arr.length;i++) {
              if (clinic_filter_arr.indexOf(user_3_ar[i].clinic_id) != -1 && bool_3) {
                user_3_arr[i].setVisible(bool_3);
                remark_3_arr.push(user_3_arr[i]);
                sum += 1;
                sum_3 += 1;
              } else {
                user_3_arr[i].setVisible(false);
              }
            }
            $('#map_sum_base').text(`表示中の顧客:${sum}人 | ${clinic_filter_arr.length}店舗`);
          }

          if (type == 1) {
            $('#indi_sum_map_0').text(`0人`);
            $('#indi_sum_map_1').text(`${sum_0}人`);
            $('#indi_sum_map_2').text(`0人`);
            $('#indi_sum_map_3').text(`${sum_1}人`);
          } else {
            $('#indi_sum_map_0').text(`${sum_0}人`);
            $('#indi_sum_map_1').text(`${sum_1}人`);
            $('#indi_sum_map_2').text(`${sum_2}人`);
            $('#indi_sum_map_3').text(`${sum_3}人`);
          }

          marker_group_0.clearMarkers();
          marker_group_1.clearMarkers();
          marker_group_2.clearMarkers();
          marker_group_3.clearMarkers();

          let data_0_image = type == 1 ? `0` : `3`;
          let data_1_image = type == 1 ? `2` : `3`;

          marker_group_0 = new MarkerClusterer(map, remark_0_arr,{
            minimumClusterSize:100,
            styles:[
              {textColor: 'white',url: `/assets/group_${data_0_image}.png`,height:52,width:53},
              {textColor: 'white',url: `/assets/group_${data_0_image}.png`,height:52,width:53},
              {textColor: 'white',url: `/assets/group_${data_0_image}.png`,height:52,width:53},
              {textColor: 'white',url: `/assets/group_${data_0_image}.png`,height:52,width:53},
              {textColor: 'white',url: `/assets/group_${data_0_image}.png`,height:52,width:53}
            ]
          });
          marker_group_1 = new MarkerClusterer(map, remark_1_arr,{
            minimumClusterSize:100,
            styles:[
              {textColor: 'white',url: `/assets/group_${data_1_image}.png`,height:55,width:56},
              {textColor: 'white',url: `/assets/group_${data_1_image}.png`,height:55,width:56},
              {textColor: 'white',url: `/assets/group_${data_1_image}.png`,height:55,width:56},
              {textColor: 'white',url: `/assets/group_${data_1_image}.png`,height:55,width:56},
              {textColor: 'white',url: `/assets/group_${data_1_image}.png`,height:55,width:56},
            ]
          });
          marker_group_2 = new MarkerClusterer(map, remark_2_arr,{
            minimumClusterSize:100,
            styles:[
              {textColor: 'white',url: '/assets/group_1.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_1.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_1.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_1.png',height:65,width:66},
              {textColor: 'white',url: '/assets/group_1.png',height:65,width:66},
            ]
          });
          marker_group_3 = new MarkerClusterer(map, remark_3_arr,{
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
        $(document).off('click','input[name="map_segment_"]').on('click','input[name="map_segment_"]',function() {
          redesc_filted_user();
        });

        const desc_map_view = () => {
          desc_map();
          redesc_filted_user();
        }
        desc_map_view();
      }

      $(document).off('input','input[name="mst_"]').on('input','input[name="mst_"]',function() {
        let index = $('input[name="mst_"]').index(this);
        desc_label(index);
        desc_leveling(index);
      });
      desc_label(0);
      desc_leveling(0);
    }
    const desc_repeat = () => {
      let _objs_arr = [
        data.data.customer,
        data.data.customer.filter(({min_rep}) => min_rep == 1),
        data.data.customer.filter(({min_rep}) => min_rep != 1)
      ];

      const desc_repeat_excel = (sender) => {
        let cuo = sender.cuo;
        let title = sender.title;

        if (!cuo.exist_val()) {
          alert('該当する顧客がいなかったのでエクセルの出力を停止しました。');
        } else {
          (() => {
            $('#repeat_table').html(``);
            let ap = ``;

            let go = ["","男性","女性"];

            cuo.forEach((cell) => {
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
                <th>${cell.clinic_name}</th>
                <th>${cell.age}</th>
                <th>${go[cell.gender]}</th>

                <th>${cell.min_month.str_date(`-`)}</th>
                <th>${cell.max_month.str_date(`-`)}</th>

                <th>${cell.data_0}</th>
                <th>${cell.data_1}</th>
                <th>${cell.data_2}</th>
                <th>${cell.data_3}</th>
                <th>${cell.count}</th>

              </tr>
              `;
            });

            $('#repeat_excel_table').append(
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
                <th>年齢</th>
                <th>性別</th>

                <th>初回来院月</th>
                <th>離脱月</th>

                <th>総合売上</th>
                <th>保険請求額</th>
                <th>保険負担金</th>
                <th>自費売上</th>
                <th>来院回数</th>
              </tr>
              ${ap}
              `
            );
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
            document.querySelectorAll('#repeat_excel_table').forEach(function (currentValue, index) {
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
            }), `${title}の顧客一覧${ps.str_date(`-`)}~${pe.str_date(`-`)}.xlsx`);
          })();
        }
      }

      const desc_ = (st) => {
        let _objs = _objs_arr[st];

        (() => {
          let ap = ``;

          let sum_amount = _objs.length;
          let sum_data = _objs.sum_val('data_0');

          pa.forEach((label,idx) => {
            let day_pa = period_map(`${label}-01`,pe,0).length;

            let pl = label.str_date(`.`);

            let result = _objs.filter(({min_month}) => min_month == label);

            let amount = result.length;
            let amount_rate = amount.to_perate(sum_amount);

            let repeater = result.filter(({count}) => count >= 2).length;
            let repeat_rate = repeater.to_perate(amount);

            let lefter = result.filter(({count}) => count == 1).length;
            let left_rate = lefter.to_perate(amount);

            let data = result.sum_val('data_0');
            let rate = data.to_perate(sum_data);

            let count = result.sum_val('count');
            let ave_count = count.to_Perate(amount);
            let count_cycle = day_pa.to_Perate(count/amount);

            let cup = data.to_devide(count);
            let ltv = data.to_devide(amount);

            ap +=
            `
            <tr>
              <th>${pl}</th>
              <td>
                <div class="amount">
                  <span>(${amount_rate}%)</span>
                  ${amount.toLocaleString()}
                </div>
                <div class="bb" style="width:${amount_rate}%;"></div>
              </td>
              <td>
                <div class="amount">
                  <span>(${repeat_rate}%)</span>
                  ${repeater.toLocaleString()}
                </div>
                <div class="bb" style="width:${repeat_rate}%;"></div>
              </td>
              <td>
                <div class="amount">
                  <span>(${left_rate}%)</span>
                  ${lefter.toLocaleString()}
                </div>
                <div class="bb bb_con" style="width:${left_rate}%;"></div>
              </td>
              <td>
                <div class="amount">
                  <span>(${rate}%)</span>
                  ¥${data.toLocaleString()}
                </div>
                <div class="bb" style="width:${rate}%;"></div>
              </td>
              <td><div class="amount">¥${cup.toLocaleString()}</div></td>
              <td><div class="amount">¥${ltv.toLocaleString()}</div></td>
              <td><div class="amount">${ave_count}回</div></td>
              <td><div class="amount">${count_cycle.str_jp()}日</div></td>
            </tr>
            `;
          });

          $('#repeat_summary_table_base').html(
            `
            <table>
              <thead>
                <tr>
                  <th>初回月</th>
                  <th>該当人数</th>
                  <th>1度でもリピートした</th>
                  <th>1回目で離脱</th>
                  <th>総売上</th>
                  <th>客単価</th>
                  <th>LTV</th>
                  <th>平均来院数</th>
                  <th>来院周期</th>
                </tr>
              </thead>
              <tbody>
                ${ap}
              </tbody>
            <table>
            `
          );
        })();
        (() => {
          let excel_data_f_arr = [];
          let excel_data_d_arr = [];
          let excel_data_d_num = 0;

          let ap = ``;
          let col_pl = ``;

          let sum_amount = _objs.length;
          let sum_data = _objs.sum_val('data_0');

          pa.forEach((label,idx) => {

            let pl = label.str_date(`.`);
            col_pl += `<th>${pl}</th>`;

            let result = _objs.filter(({min_month}) => min_month == label);

            let amount = result.length;
            let amount_rate = amount.to_perate(sum_amount);

            let app = ``;
            pa.forEach((col_label,i) => {
              let rslt =
              label == col_label
              ? result.filter((cell) => cell[col_label] >= 2)
              : result.filter((cell) => cell[col_label] >= 1);

              let user = rslt.length;
              let rate = user.to_perate(amount);

              if (col_label < label) {
                app += `<th></th>`;
              } else {
                app +=
                `
                <td class="repeat_0_tdd_" id="repeat_0_tdd_${excel_data_d_num}">
                  <div class="amount">
                    <span>(${rate}%)</span>
                    ${user.toLocaleString()}
                  </div>
                  <div class="bb" style="width:${rate}%;"></div>
                </td>
                `;
                excel_data_d_num += 1;
                excel_data_d_arr.push({cuo:rslt,title:`初回来院月が${pl}でリピート月が${col_label.str_date(`.`)}`});
              }
            });

            ap +=
            `
            <tr>
              <th>${pl}</th>
              <td class="repeat_0_tdf_" id="repeat_0_tdf_${idx}">
                <div class="amount">
                  <span>(${amount_rate}%)</span>
                  ${amount.toLocaleString()}
                </div>
                <div class="bb" style="width:${amount_rate}%;"></div>
              </td>
              ${app}
            </tr>
            `;

            excel_data_f_arr.push({cuo:result,title:`初回来院月が${pl}`});
          });

          $('#repeat_table_base').html(
            `
            <table>
              <thead>
                <tr>
                  <th rowspan="2">初回月</th>
                  <th rowspan="2">該当人数</th>
                  <th colspan="${pa.length}">リピート月</th>
                </tr>
                <tr>
                  ${col_pl}
                </tr>
              </thead>
              <tbody>
                ${ap}
              </tbody>
            <table>
            `
          );

          $(document).off('click','.repeat_0_tdf_').on('click','.repeat_0_tdf_',function() {
            let id = $(this).prop('id').split('_')[3];
            let arr = excel_data_f_arr[id];
            desc_repeat_excel(arr);
          });
          $(document).off('click','.repeat_0_tdd_').on('click','.repeat_0_tdd_',function() {
            let id = $(this).prop('id').split('_')[3];
            let arr = excel_data_d_arr[id];
            desc_repeat_excel(arr);
          });
        })();
        (() => {
          let excel_data_f_arr = [];
          let excel_data_d_arr = [];
          let excel_data_d_num = 0;

          let ap = ``;
          let col_pl = ``;

          let sum_amount = _objs.length;
          let sum_data = _objs.sum_val('data_0');

          pa.forEach((label,idx) => {

            let pl = label.str_date(`.`);
            col_pl += `<th>${pl}</th>`;

            let result = _objs.filter(({min_month}) => min_month == label);
            let amount = result.length;
            let amount_rate = amount.to_perate(sum_amount);

            let app = ``;
            pa.forEach((col_label) => {
              let rslt = result.filter(({max_month}) => max_month == col_label);

              let user = rslt.length;
              let rate = user.to_perate(amount);

              if (col_label < label) {
                app += `<th></th>`;
              } else {
                app +=
                `
                <td class="repeat_0_tdd_" id="repeat_0_tdd_${excel_data_d_num}">
                  <div class="amount">
                    <span>(${rate}%)</span>
                    ${user.toLocaleString()}
                  </div>
                  <div class="bb bb_con" style="width:${rate}%;"></div>
                </td>
                `;
                excel_data_d_num += 1;
                excel_data_d_arr.push({cuo:rslt,title:`初回来院月が${pl}で離脱月が${col_label.str_date(`.`)}`});
              }
            });

            ap +=
            `
            <tr>
              <th>${pl}</th>
              <td class="repeat_0_tdf_" id="repeat_0_tdf_${idx}">
                <div class="amount">
                  <span>(${amount_rate}%)</span>
                  ${amount.toLocaleString()}
                </div>
                <div class="bb" style="width:${amount_rate}%;"></div>
              </td>
              ${app}
            </tr>
            `;

            excel_data_f_arr.push({cuo:result,title:`初回来院月が${pl}`});
          });

          $('#left_table_base').html(
            `
            <table>
              <thead>
                <tr>
                  <th rowspan="2">初回月</th>
                  <th rowspan="2">該当人数</th>
                  <th colspan="${pa.length}">離脱月</th>
                </tr>
                <tr>
                  ${col_pl}
                </tr>
              </thead>
              <tbody>
                ${ap}
              </tbody>
            <table>
            `
          );

          $(document).off('click','.repeat_0_tdf_').on('click','.repeat_0_tdf_',function() {
            let id = $(this).prop('id').split('_')[3];
            let arr = excel_data_f_arr[id];
            desc_repeat_excel(arr);
          });
          $(document).off('click','.repeat_0_tdd_').on('click','.repeat_0_tdd_',function() {
            let id = $(this).prop('id').split('_')[3];
            let arr = excel_data_d_arr[id];
            desc_repeat_excel(arr);
          });
        })();
      }
      desc_(0);
      $(document).off('input','input[name="repeat_input_"]').on('input','input[name="repeat_input_"]',function() {
        let index = $('input[name="repeat_input_"]').index(this);
        desc_(index);
      });
    }
    const desc_decyle = () => {
      let _objs = Array.from(data.data.customer);
      let step = Math.floor(_objs.length / 10);
      let data_0_step = 0;
      let data_0_max = _objs.sum_val(`data_0`);

      let data_0_arr = [];
      let data_1_arr = [];
      let data_2_arr = [];
      let rate_0_arr = [];

      let tpl = [];

      const desc_leveling = () => {
        let ap = ``;
        for (let i = 0;i < 10;i++) {
          tpl.push(`デシル${i+1}`);
          let result = i == 9 ? _objs : _objs.splice(0,step);

          let data_0 = result.sum_val(`data_0`);
          data_0_step += data_0;
          let rate_0 = data_0_step.to_perate(data_0_max);

          let count = result.sum_val('count');

          let data_1 = data_0.to_devide(result.length);
          let data_2 = data_0.to_devide(count);
          let data_3 = data_0.to_devide(result.sum_val(`data_4`));
          let data_4 = count.to_Perate(result.length);

          data_0_arr.push(data_0);
          rate_0_arr.push(rate_0);
          data_1_arr.push(data_2);
          data_2_arr.push(data_3);

          ap +=
          `
          <tr>
            <th>
              デシル${i+1}
            </th>
            <td>${result.length}人</td>
            <td>
              <div class="amount">${data_0.toLocaleString()}</div>
            </td>
            <td>
              ${rate_0}%
              <div class="bb" style="width:${rate_0}%"></div>
            </td>
            <td>${data_1.toLocaleString()}</td>
            <td>${data_2.toLocaleString()}</td>
            <td>${data_3.toLocaleString()}</td>
            <td>${data_4}回</td>
          </tr>
          `;
        }

        (() => {
          let objs = data.data.customer;
          let data_0 = data_0_max;
          let rate_0 = 100;

          let count = objs.sum_val('count');

          let data_1 = data_0.to_devide(objs.length);
          let data_2 = data_0.to_devide(count);
          let data_3 = data_0.to_devide(objs.sum_val(`data_4`));
          let data_4 = count.to_Perate(objs.length);
          ap +=
          `
          <tr><th class="th_long" colspan="6"></th></tr>
          <tr>
            <th>合計と平均</th>
            <th>${data.data.customer.length}人</th>
            <td>
              <div class="amount">¥${data_0.toLocaleString()}</div>
            </td>
            <td>--</td>
            <td>
              <div class="amount">¥${data_1.toLocaleString()}</div>
            </td>
            <td>
              <div class="amount">¥${data_2.toLocaleString()}</div>
            </td>
            <td>
              <div class="amount">¥${data_3.toLocaleString()}</div>
            </td>
            <td>
              <div class="amount">${data_4}回</div>
            </td>
          </tr>
          `;
        })();

        $('#decyle_table_base').html(
          `
          <table id="decyle_table">
            <thead>
              <tr>
                <th>-</th>
                <th>人数</th>
                <th>総合売上</th>
                <th>累計売上比率</th>
                <th>LTV</th>
                <th>客単価</th>
                <th>時間単価</th>
                <th>平均来院数</th>
              </tr>
            </thead>
            <tbody>${ap}</tbody>
          </table>
          `
        );
      }
      const desc_graph = () => {
        const desc_bar = () => {
          let graph_data = [{
            type:"LineWithLine",
            label:"総合売上累積割合",
            data:rate_0_arr,
            borderColor:`rgba(242,100,100)`,
            pointBackgroundColor:"#fff",
            backgroundColor:"#fff",
            fill:false,
            borderWidth:1,
            yAxisID: "y-axis-1",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          },{
            type:"bar",
            label:"総合売上",
            data:data_0_arr,
            backgroundColor:`rgba(54,100,180,1)`,
            borderColor:`rgba(54,100,180,1)`,
            yAxisID: "y-axis-0",
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          }];
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
                  return `デシルグループ${index+1}`;
                },
                label:function(t,d) {
                  let index = t.index;
                  let idx = t.datasetIndex;
                  let amount = t.yLabel;
                  let ar = ["累積比率","自費売上"];
                  let dar = ["%","円"];
                  return `${ar[idx]} ${amount.toLocaleString()}${dar[idx]}`;
                }
              }
            }
          }
          decyle_bar.data = {
            labels:tpl,
            datasets:graph_data
          };
          decyle_bar.options = graph_option;
          decyle_bar.update();
        }
        const desc_line = () => {
          let graph_data = [{
            type:"LineWithLine",
            label:"総売客単価",
            data:data_1_arr,
            borderColor:`rgba(242,100,100)`,
            backgroundColor:"#fff",
            fill:false,
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          },{
            type:"LineWithLine",
            label:"総売時間単価",
            data:data_2_arr,
            borderColor:`rgba(54,100,180,1)`,
            backgroundColor:"#fff",
            fill:false,
            cubicInterpolationMode: 'monotone',
            lineTension: 0
          }];
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
                  return `デシルグループ${index+1}`;
                },
                label:function(t,d) {
                  let index = t.index;
                  let idx = t.datasetIndex;
                  let amount = t.yLabel;
                  let ar = ["客単価","時間単価"];
                  return `${ar[idx]} ${amount.toLocaleString()}円`;
                }
              }
            }
          }
          decyle_line.data = {
            labels:tpl,
            datasets:graph_data
          };
          decyle_line.options = graph_option;
          decyle_line.update();
        }

        desc_bar();
        desc_line();
      }
      const desc_excel = () => {
        $(document).off('click','#decyle_customer_excel').on('click','#decyle_customer_excel',function() {
          (() => {

            let customer_objs = Array.from(data.data.customer);
            let data_0_step = 0;

            let ap = ``;
            for (let i = 0;i < 10;i++) {
              let result = i == 9 ? customer_objs : customer_objs.splice(0,step);

              let data_0 = result.sum_val(`data_0`);
              data_0_step += data_0;
              let rate_0 = data_0_step.to_perate(data_0_max);

              let count = result.sum_val('count');

              let data_1 = data_0.to_devide(result.length);
              let data_2 = data_0.to_devide(count);
              let data_3 = data_0.to_devide(result.sum_val(`data_4`));
              let data_4 = count.to_Perate(result.length);

              ap +=
              `
              <tr>
                <th>デシル${i+1}</th>
                <td>${result.length}人</td>
                <td>${data_0}</td>
                <td>${rate_0}%</td>
                <td>${data_1}</td>
                <td>${data_2}</td>
                <td>${data_3}</td>
                <td>${data_4}</td>
              </tr>
              `;
            }
            (() => {
              let objs = data.data.customer;
              let data_0 = data_0_max;
              let rate_0 = 100;

              let count = objs.sum_val('count');

              let data_1 = data_0.to_devide(objs.length);
              let data_2 = data_0.to_devide(count);
              let data_3 = data_0.to_devide(objs.sum_val(`data_4`));
              let data_4 = count.to_Perate(objs.length);

              ap +=
              `
              <tr><th class="th_long" colspan="6"></th></tr>
              <tr>
                <th>合計と平均</th>
                <th>${data.data.customer.length}人</th>
                <td>${data_0}</td>
                <td>--</td>
                <td>${data_1}</td>
                <td>${data_2}</td>
                <td>${data_3}</td>
                <td>${data_4}</td>
              </tr>
              `;
            })();

            $('#decyle_table_summary').html(
              `
              <thead>
                <tr>
                  <th>-</th>
                  <th>人数</th>
                  <th>総合売上</th>
                  <th>累計売上比率</th>
                  <th>LTV</th>
                  <th>客単価</th>
                  <th>時間単価</th>
                  <th>平均来院数</th>
                </tr>
              </thead>
              <tbody>${ap}</tbody>
              `
            );
          })();
          (() => {
            $('#decyle_table_part_base').html(``);

            let customer_objs = Array.from(data.data.customer);
            let go = ["","男性","女性"];

            for (let i = 0;i < 10;i++) {
              let ap = ``;
              let result = i == 9 ? customer_objs : customer_objs.splice(0,step);

              result.forEach((cell) => {

                ap +=
                `
                <tr>
                  <th>${i+1}</th>
                  <th>${user_name==MSD_smn?`患者${cell.c_ptno}`:cell.c_name}</th>
                  <th>${user_name==MSD_smn?`カンジャ${cell.c_ptno}`:cell.c_kana}</th>
                  <th>${cell.tel}</th>
                  <th>${cell.mobile}</th>
                  <th>${cell.postcd}</th>
                  <th>${cell.addr1}</th>
                  <th>${cell.addr2}</th>
                  <th>${cell.email}</th>
                  <th>${cell.clinic_name}</th>
                  <th>${cell.staff_name}</th>
                  <th>${cell.age}</th>
                  <th>${go[cell.gender]}</th>

                  <th>${cell.data_0}</th>
                  <th>${cell.data_1}</th>
                  <th>${cell.data_2}</th>
                  <th>${cell.data_3}</th>
                  <th>${cell.count}</th>

                </tr>
                `;
              });

              $('#decyle_table_part_base').append(
                `
                <table data-sheet-name="デシルランク${i+1}">
                  <tr>
                    <th>デシルランク</th>
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

                    <th>総合売上</th>
                    <th>保険請求額</th>
                    <th>保険負担金</th>
                    <th>自費売上</th>
                    <th>来院回数</th>
                  </tr>
                  ${ap}
                </table>
                `
              );
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
            document.querySelectorAll('#decyle_table_bases table').forEach(function (currentValue, index) {
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
            }), `デシル分析${ps.str_date(`-`)}~${pe.str_date(`-`)}.xlsx`);
          })();
        });
      }

      desc_leveling();
      desc_graph();
      desc_excel();
    }
    const desc_rfm = () => {
      let _objs = Array.from(data.data.customer);

      let r_def = [];
      let f_def = [];
      let m_def = [];

      let g_obj = [];

      let r_obj = [],f_obj = [],m_obj = [];

      const distribution_checker = () => {
        let c_p_r = false;
        let c_p_f = false;
        let c_p_m = false;

        const r_checker = () => {
          c_p_r = true;

          $('#rfm_result_indi_r_base').html(``);
          let day = new Date(pe);
          let r_dl = [
            Number(getDOM('rfm_r_5').value),
            Number(getDOM('rfm_r_4').value),
            Number(getDOM('rfm_r_3').value),
            Number(getDOM('rfm_r_2').value),
            Number(getDOM('rfm_r_1').value)
          ];

          let r_0 = day.aD(-r_dl[0]).dD();
          let r_1 = day.aD(-r_dl[1]).dD();
          let r_2 = day.aD(-r_dl[2]).dD();
          let r_3 = day.aD(-r_dl[3]).dD();
          let r_4 = day.aD(-r_dl[4]).dD();

          r_def = [r_0,r_1,r_2,r_3,r_4];
          r_obj = [
            _objs.filter(({last_sdate}) => last_sdate >= r_def[0]),
            _objs.filter(({last_sdate}) => last_sdate >= r_def[1] && last_sdate < r_def[0]),
            _objs.filter(({last_sdate}) => last_sdate >= r_def[2] && last_sdate < r_def[1]),
            _objs.filter(({last_sdate}) => last_sdate >= r_def[3] && last_sdate < r_def[2]),
            _objs.filter(({last_sdate}) => last_sdate >= r_def[4] && last_sdate < r_def[3])
          ];

          $('#rfm_result_r_base').html(`<i class="fas fa-check" style="color:rgba(32,178,170,0.8);"></i> 最適のR分布です`);
          for (let i = 0;i < 5;i++) {
            let rate = r_obj[i].length.to_perate(_objs.length);

            $('#rfm_result_indi_r_base').append(`<div>R${5-i}: ${rate}%</div>`);
            $(`#bar_base_r .bar_${i}`).css('width',`${rate}%`);

            let ap = ``;
            if (rate <= 5 || rate >= 68) {
              ap = `<i class="fas fa-exclamation-triangle" style="color:rgb(255,215,0);"></i> 分布が偏っています`;
            } else if (rate <= 15 || rate >= 25) {
              ap = `<i class="fas fa-check" style="color:rgba(32,178,170,0.8);"></i> ok`;
            } else {
              ap = `<i class="fas fa-stars" style="color:rgba(32,178,170,0.8);"></i> 最適分布です`;
            }
            $('#rfm_result_r_base').html(ap);
          }

          setTimeout(() => {
            c_p_r = false;
          },100);
        }
        const f_checker = () => {
          c_p_f = true;

          $('#rfm_result_indi_f_base').html(``);

          f_def = [
            Number(getDOM('rfm_f_5').value),
            Number(getDOM('rfm_f_4').value),
            Number(getDOM('rfm_f_3').value),
            Number(getDOM('rfm_f_2').value),
            Number(getDOM('rfm_f_1').value)
          ];
          f_obj = [
            _objs.filter(({count}) => count >= f_def[0]),
            _objs.filter(({count}) => count >= f_def[1] && count < f_def[0]),
            _objs.filter(({count}) => count >= f_def[2] && count < f_def[1]),
            _objs.filter(({count}) => count >= f_def[3] && count < f_def[2]),
            _objs.filter(({count}) => count >= f_def[4] && count < f_def[3])
          ];

          $('#rfm_result_f_base').html(`<i class="fas fa-check" style="color:rgba(32,178,170,0.8);"></i> 最適のF分布です`);
          for (let i = 0;i < 5;i++) {
            let rate = f_obj[i].length.to_perate(_objs.length);

            $('#rfm_result_indi_f_base').append(`<div>F${5-i}: ${rate}%</div>`);
            $(`#bar_base_f .bar_${i}`).css('width',`${rate}%`);

            let ap = ``;
            if (rate <= 5 || rate >= 68) {
              ap = `<i class="fas fa-exclamation-triangle" style="color:rgb(255,215,0);"></i> 分布が偏っています`;
            } else if (rate <= 15 || rate >= 25) {
              ap = `<i class="fas fa-check" style="color:rgba(32,178,170,0.8);"></i> ok`;
            } else {
              ap = `<i class="fas fa-stars" style="color:rgba(32,178,170,0.8);"></i> 最適分布です`;
            }
            $('#rfm_result_f_base').html(ap);
          }

          setTimeout(() => {
            c_p_f = false;
          },100);
        }
        const m_checker = () => {
          c_p_m = true;

          $('#rfm_result_indi_m_base').html(``);

          m_def = [
            Number(getDOM('rfm_m_5').value),
            Number(getDOM('rfm_m_4').value),
            Number(getDOM('rfm_m_3').value),
            Number(getDOM('rfm_m_2').value),
            Number(getDOM('rfm_m_1').value)
          ];
          m_obj = [
            _objs.filter(({data_0}) => data_0 >= m_def[0]),
            _objs.filter(({data_0}) => data_0 >= m_def[1] && data_0 < m_def[0]),
            _objs.filter(({data_0}) => data_0 >= m_def[2] && data_0 < m_def[1]),
            _objs.filter(({data_0}) => data_0 >= m_def[3] && data_0 < m_def[2]),
            _objs.filter(({data_0}) => data_0 >= m_def[4] && data_0 < m_def[3])
          ];

          for (let i = 0;i < 5;i++) {
            let rate = m_obj[i].length.to_perate(_objs.length);

            $('#rfm_result_indi_m_base').append(`<div>M${5-i}: ${rate}%</div>`);
            $(`#bar_base_m .bar_${i}`).css('width',`${rate}%`);

            let ap = ``;
            if (rate <= 5 || rate >= 68) {
              ap = `<i class="fas fa-exclamation-triangle" style="color:rgb(255,215,0);"></i> 分布が偏っています`;
            } else if (rate <= 15 || rate >= 25) {
              ap = `<i class="fas fa-check" style="color:rgba(32,178,170,0.8);"></i> ok`;
            } else {
              ap = `<i class="fas fa-stars" style="color:rgba(32,178,170,0.8);"></i> 最適分布です`;
            }
            $('#rfm_result_m_base').html(ap);
          }

          setTimeout(() => {
            c_p_m = false;
          },100);
        }

        r_checker();
        f_checker();
        m_checker();

        $(document).on('input','input[name="rfm_r_"]',function() {
          if (!c_p_r) r_checker();
        });
        $(document).on('input','input[name="rfm_f_"]',function() {
          if (!c_p_f) f_checker();
        });
        $(document).on('input','input[name="rfm_m_"]',function() {
          if (!c_p_m) m_checker();
        });
      }
      const desc_content = () => {
        const desc_leveling = () => {
          let day = new Date(pe);
          let r_dl = [
            Number(getDOM('rfm_r_5').value),
            Number(getDOM('rfm_r_4').value),
            Number(getDOM('rfm_r_3').value),
            Number(getDOM('rfm_r_2').value),
            Number(getDOM('rfm_r_1').value)
          ];
          let r_0 = day.aD(-r_dl[0]).dD();
          let r_1 = day.aD(-r_dl[1]).dD();
          let r_2 = day.aD(-r_dl[2]).dD();
          let r_3 = day.aD(-r_dl[3]).dD();
          let r_4 = day.aD(-r_dl[4]).dD();

          let r_def = [r_0,r_1,r_2,r_3,r_4];
          let f_def = [
            Number(getDOM('rfm_f_5').value),
            Number(getDOM('rfm_f_4').value),
            Number(getDOM('rfm_f_3').value),
            Number(getDOM('rfm_f_2').value),
            Number(getDOM('rfm_f_1').value)
          ];
          let m_def = [
            Number(getDOM('rfm_m_5').value),
            Number(getDOM('rfm_m_4').value),
            Number(getDOM('rfm_m_3').value),
            Number(getDOM('rfm_m_2').value),
            Number(getDOM('rfm_m_1').value)
          ];

          const r_checker = (o) => {
            let r_i =
            o >= r_def[0]
              ? 5
              : o >= r_def[1]
                ? 4
                : o >= r_def[2]
                  ? 3
                  : o >= r_def[3]
                    ? 2
                    : o >= r_def[4]
                      ? 1
                      : console.log('');
            return r_i;
          }
          const f_checker = (o) => {
            let r_i =
            o >= f_def[0]
              ? 5
              : o >= f_def[1]
                ? 4
                : o >= f_def[2]
                  ? 3
                  : o >= f_def[3]
                    ? 2
                    : o >= f_def[4]
                      ? 1
                      : console.log('');
            return r_i;
          }
          const m_checker = (o) => {
            let r_i =
            o >= m_def[0]
              ? 5
              : o >= m_def[1]
                ? 4
                : o >= m_def[2]
                  ? 3
                  : o >= m_def[3]
                    ? 2
                    : o >= m_def[4]
                      ? 1
                      : 0;
            return r_i;
          }
          const cluster_checker = (r,f) => {
            if ((r == 5 || r == 4) && (f == 5 || f == 4)) {
              return 0;
            }
            if ((r == 4 || r == 3) && (f == 3 || f == 2)) {
              return 1;
            }
            if (r == 5 && f == 1) {
              return 2;
            }
            if (r == 5 && (f == 3 || f == 2)) {
              return 3;
            }
            if ((r == 4 || r == 3) && f == 1) {
              return 4;
            }
            if ((r == 3 || r == 2) && (f == 5 || f == 4)) {
              return 4;
            }
            if (r == 1 && (f == 5 || f == 4)) {
              return 5;
            }
            if (r == 1 && (f == 2 || f == 1)) {
              return 6;
            }
            return 7;
          }

          _objs.forEach((cell) => {
            let r = r_checker(cell.last_sdate);
            let f = f_checker(cell.count);
            let m = m_checker(cell.data_0);
            cell.r_level = r;
            cell.f_level = f;
            cell.m_level = m;
            cell.rf_score = r + f;
            cell.rfm_score = r + f + m;
            cell.cluster_score = cluster_checker(r,f);
          });
          const calc_clustering = (sender,arr) => {
            let obj_arr = [];
            arr.forEach((ar) => {
              let r = ar[0];
              let f = ar[1];
              let objs = sender.filter((cell) => cell.r_level == r && cell.f_level == f);

              obj_arr = obj_arr.concat(objs);
            });
            return obj_arr;
          }
          g_obj = [
            calc_clustering(_objs,[[5,5],[5,4],[4,5],[4,4]]),
            calc_clustering(_objs,[[4,3],[4,2],[3,3],[3,2]]),
            calc_clustering(_objs,[[5,1]]),
            calc_clustering(_objs,[[5,3],[5,2]]),
            calc_clustering(_objs,[[4,1],[3,1]]),
            calc_clustering(_objs,[[3,5],[3,4],[2,5],[2,4]]),
            calc_clustering(_objs,[[1,5],[1,4]]),
            calc_clustering(_objs,[[1,2],[1,1]]),
            calc_clustering(_objs,[[2,3],[2,2],[2,1],[1,3]])
          ];
        }

        const desc_cluster = () => {
          let name_arr = ["優良顧客","安定顧客","新規","優良新規","新規離反","離反傾向","優良離反","完全離反","その他"];
          let color_arr = [
            "#4285f4",
            "#20aab3",
            "#a2f8ff",
            "#45a5ff",
            "rgba(162,248,255,.5)",
            "#ffc800",
            "#ff8700",
            "#ff3c05",
            "#f1f1f1"
          ];

          const desc_table_cell = () => {
            let ap =
            `
            <tr>
              <th></th>
              <th>f5</th>
              <th>f4</th>
              <th>f3</th>
              <th>f2</th>
              <th>f1</th>
            </tr>
            `;

            let c_0_ar = [0,0,5,5,6];
            let c_1_ar = [0,0,5,5,6];
            let c_2_ar = [3,1,1,8,8];
            let c_3_ar = [3,1,1,8,7];
            let c_4_ar = [2,4,4,8,7];
            for (let i = 0;i < 5;i++) {
              ap +=
              `
              <tr>
                <th>r${5 - i}</th>
                <td style="background-color:${color_arr[c_0_ar[i]]}"></td>
                <td style="background-color:${color_arr[c_1_ar[i]]}"></td>
                <td style="background-color:${color_arr[c_2_ar[i]]}"></td>
                <td style="background-color:${color_arr[c_3_ar[i]]}"></td>
                <td style="background-color:${color_arr[c_4_ar[i]]}"></td>
              </tr>
              `;
            }

            $('#rfm_cluster_table_cell').html(ap);
          }
          const desc_table = () => {
            let ap = ``;

            for (let i = 0;i < 9;i++) {
              let result = g_obj[i];

              let amount = result.length;
              let rate_amount = amount.to_perate(_objs.length);
              let count = result.sum_val('count');
              let hour = result.sum_val('data_4');

              let data = result.sum_val('data_0');
              let rate_data = data.to_perate(_objs.sum_val('data_0'));
              let ltv = data.to_devide(amount);
              let cup = data.to_devide(count);
              let hup = data.to_devide(hour);
              let cuc = count.to_Perate(amount);

              ap +=
              `
              <tr>
                <th>
                  <i class="fas fa-stop" style="color:${color_arr[i]};"></i>
                  ${name_arr[i]}
                </th>
                <td>
                  <div class="amount">
                    ${amount.toLocaleString()}
                    <span class="percent">${rate_amount}%</span>
                  </div>
                  <div class="bb" style="width:${rate_amount}%;"></div>
                </td>
                <td>
                  <div class="amount">
                    ${data.str_jp()}
                    <span class="percent">${rate_data}%</span>
                  </div>
                  <div class="bb" style="width:${rate_data}%;"></div>
                </td>
                <td>¥${ltv.toLocaleString()}</td>
                <td>¥${cup.toLocaleString()}</td>
                <td>¥${hup.toLocaleString()}</td>
                <td>${cuc}回</td>
              </tr>
              `;
            }

            $('#rfm_cluster_table').html(
              `
              <thead>
                <tr>
                  <th>クラスタ</th>
                  <th>該当人数</th>
                  <th>総合売上</th>
                  <th>LTV</th>
                  <th>客単価</th>
                  <th>時間単価</th>
                  <th>平均来院数</th>
                </tr>
              </thead>
              <tbody>
                ${ap}
              </tbody>
              `
            );
          }
          const desc_excel = () => {
            $(document).off('click','#rfm_cluster_excel_btn').on('click','#rfm_cluster_excel_btn',function() {
              (() => {
                let ap = ``;

                for (let i = 0;i < 9;i++) {
                  let result = g_obj[i];

                  let amount = result.length;
                  let rate_amount = amount.to_perate(_objs.length);
                  let count = result.sum_val('count');
                  let hour = result.sum_val('data_4');

                  let data = result.sum_val('data_0');
                  let rate_data = data.to_perate(_objs.sum_val('data_0'));
                  let ltv = data.to_devide(amount);
                  let cup = data.to_devide(count);
                  let hup = data.to_devide(hour);
                  let cuc = count.to_Perate(amount);

                  ap +=
                  `
                  <tr>
                    <th>${name_arr[i]}</th>
                    <td>${amount}</td>
                    <td>${data}</td>
                    <td>${ltv}</td>
                    <td>${cup}</td>
                    <td>${hup}</td>
                    <td>${cuc}</td>
                  </tr>
                  `;
                }
                $('#rfm_cluster_table_summary').html(
                  `
                  <thead>
                    <tr>
                      <th>クラスタ</th>
                      <th>該当人数</th>
                      <th>総合売上</th>
                      <th>LTV</th>
                      <th>客単価</th>
                      <th>時間単価</th>
                      <th>平均来院数</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ap}
                  </tbody>
                  `
                );
              })();
              (() => {
                $('#rfm_cluster_table_part_base').html(``);
                let go = ["","男性","女性"];

                for (let i = 0;i < 9;i++) {
                  let ap = ``;
                  let result = g_obj[i];

                  result.forEach((cell) => {

                    ap +=
                    `
                    <tr>
                      <th>${name_arr[i+1]}</th>
                      <th>${user_name==MSD_smn?`患者${cell.c_ptno}`:cell.c_name}</th>
                      <th>${user_name==MSD_smn?`カンジャ${cell.c_ptno}`:cell.c_kana}</th>
                      <th>${cell.tel}</th>
                      <th>${cell.mobile}</th>
                      <th>${cell.postcd}</th>
                      <th>${cell.addr1}</th>
                      <th>${cell.addr2}</th>
                      <th>${cell.email}</th>
                      <th>${cell.clinic_name}</th>
                      <th>${cell.staff_name}</th>
                      <th>${cell.age}</th>
                      <th>${go[cell.gender]}</th>

                      <th>${cell.data_0}</th>
                      <th>${cell.data_1}</th>
                      <th>${cell.data_2}</th>
                      <th>${cell.data_3}</th>
                      <th>${cell.count}</th>

                    </tr>
                    `;
                  });

                  $('#rfm_cluster_table_part_base').append(
                    `
                    <table data-sheet-name="${name_arr[i]}">
                      <tr>
                        <th>クラスターランク</th>
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

                        <th>総合売上</th>
                        <th>保険請求額</th>
                        <th>保険負担金</th>
                        <th>自費売上</th>
                        <th>来院回数</th>
                      </tr>
                      ${ap}
                    </table>
                    `
                  );
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
                document.querySelectorAll('#rfm_cluster_table_bases table').forEach(function (currentValue, index) {
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
                }), `クラスタ別顧客一覧${ps.str_date(`-`)}~${pe.str_date(`-`)}.xlsx`);
              })();
            });
          }

          desc_table_cell();
          desc_table();
          desc_excel();
        }
        const desc_rf = () => {
          const desc_table_cell = () => {
            let ap =
            `
            <tr>
              <th></th>
              <th>f5</th>
              <th>f4</th>
              <th>f3</th>
              <th>f2</th>
              <th>f1</th>
            </tr>
            `;

            for (let i = 0;i < 5;i++) {
              ap +=
              `
              <tr>
                <th>r${5 - i}</th>
                <td class="rf_ rf_table_${10 - i}"></td>
                <td class="rf_ rf_table_${9 - i}"></td>
                <td class="rf_ rf_table_${8 - i}"></td>
                <td class="rf_ rf_table_${7 - i}"></td>
                <td class="rf_ rf_table_${6 - i}"></td>
              </tr>
              `;
            }

            $('#rfm_rf_table_cell').html(ap);
          }
          const desc_table = () => {
            let data_color_arr = [];

            let ap = ``;
            for (let i = 10;i > 1;i--) {
              let result = _objs.filter(({rf_score}) => rf_score == i);

              let amount = result.length;
              let rate_amount = amount.to_perate(_objs.length);
              let count = result.sum_val('count');
              let hour = result.sum_val('data_4');

              let data = result.sum_val('data_0');
              let rate_data = data.to_perate(_objs.sum_val('data_0'));
              data_color_arr.push(rate_data);
              let ltv = data.to_devide(amount);
              let cup = data.to_devide(count);
              let hup = data.to_devide(hour);
              let cuc = count.to_Perate(amount);

              ap +=
              `
              <tr>
                <th>
                  <i class="fas fa-stop" style="color:rgb(54,100,180);"></i> ${i}点
                </th>
                <td>
                  <div class="amount">
                    ${amount.toLocaleString()}
                    <span class="percent">${rate_amount}%</span>
                  </div>
                  <div class="bb" style="width:${rate_amount}%;"></div>
                </td>
                <td>
                  <div class="amount">
                    ${data.str_jp()}
                    <span class="percent">${rate_data}%</span>
                  </div>
                  <div class="bb" style="width:${rate_data}%;"></div>
                </td>
                <td>¥${ltv.toLocaleString()}</td>
                <td>¥${cup.toLocaleString()}</td>
                <td>¥${hup.toLocaleString()}</td>
                <td>${cuc}回</td>
              </tr>
              `;
            }
            $('#rfm_rf_table').html(
              `
              <thead>
                <tr>
                  <th>RF点数</th>
                  <th>該当人数</th>
                  <th>総合売上</th>
                  <th>LTV</th>
                  <th>客単価</th>
                  <th>時間単価</th>
                  <th>平均来院数</th>
                </tr>
              </thead>
              <tbody>
                ${ap}
              </tbody>
              `
            );

            let max = data_color_arr.max_val('');
            for (let i = 10;i > 1;i--) {
              let amount = data_color_arr[10 - i];
              let rate = amount.to_Perate(max);

              $(`.rf_table_${i}`).css('opacity',`${rate}`);
            }
          }
          const desc_excel = () => {
            $(document).off('click','#rfm_rf_excel_btn').on('click','#rfm_rf_excel_btn',function() {
              (() => {
                let ap = ``;

                for (let i = 10;i > 1;i--) {
                  let result = _objs.filter(({rf_score}) => rf_score == i);

                  let amount = result.length;
                  let rate_amount = amount.to_perate(_objs.length);
                  let count = result.sum_val('count');
                  let hour = result.sum_val('data_4');

                  let data = result.sum_val('data_0');
                  let rate_data = data.to_perate(_objs.sum_val('data_0'));
                  let ltv = data.to_devide(amount);
                  let cup = data.to_devide(count);
                  let hup = data.to_devide(hour);
                  let cuc = count.to_Perate(amount);

                  ap +=
                  `
                  <tr>
                    <th>RF-${i}点</th>
                    <td>${amount}</td>
                    <td>${data}</td>
                    <td>${ltv}</td>
                    <td>${cup}</td>
                    <td>${hup}</td>
                    <td>${cuc}</td>
                  </tr>
                  `;
                }
                $('#rfm_rf_table_summary').html(
                  `
                  <thead>
                    <tr>
                      <th>RFランク</th>
                      <th>該当人数</th>
                      <th>総合売上</th>
                      <th>LTV</th>
                      <th>客単価</th>
                      <th>時間単価</th>
                      <th>平均来院数</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ap}
                  </tbody>
                  `
                );
              })();
              (() => {
                $('#rfm_rf_table_part_base').html(``);
                let go = ["","男性","女性"];

                for (let i = 10;i > 1;i--) {
                  let ap = ``;
                  let result = _objs.filter(({rf_score}) => rf_score == i);

                  result.forEach((cell) => {

                    ap +=
                    `
                    <tr>
                      <th>${i}</th>
                      <th>${user_name==MSD_smn?`患者${cell.c_ptno}`:cell.c_name}</th>
                      <th>${user_name==MSD_smn?`カンジャ${cell.c_ptno}`:cell.c_kana}</th>
                      <th>${cell.tel}</th>
                      <th>${cell.mobile}</th>
                      <th>${cell.postcd}</th>
                      <th>${cell.addr1}</th>
                      <th>${cell.addr2}</th>
                      <th>${cell.email}</th>
                      <th>${cell.clinic_name}</th>
                      <th>${cell.staff_name}</th>
                      <th>${cell.age}</th>
                      <th>${go[cell.gender]}</th>

                      <th>${cell.data_0}</th>
                      <th>${cell.data_1}</th>
                      <th>${cell.data_2}</th>
                      <th>${cell.data_3}</th>
                      <th>${cell.count}</th>

                    </tr>
                    `;
                  });

                  $('#rfm_rf_table_part_base').append(
                    `
                    <table data-sheet-name="RF-${i}点">
                      <tr>
                        <th>RFランク</th>
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

                        <th>総合売上</th>
                        <th>保険請求額</th>
                        <th>保険負担金</th>
                        <th>自費売上</th>
                        <th>来院回数</th>
                      </tr>
                      ${ap}
                    </table>
                    `
                  );
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
                document.querySelectorAll('#rfm_rf_table_bases table').forEach(function (currentValue, index) {
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
                }), `RFランク別顧客一覧${ps.str_date(`-`)}~${pe.str_date(`-`)}.xlsx`);
              })();
            });
          }

          desc_table_cell();
          desc_table();
          desc_excel();
        }
        const desc_rfm = () => {
          const desc_table_cell = () => {
            for (let i = 0;i < 5;i++) {
              let app = ``;

              for (let idx = 0;idx < 5;idx++) {
                app +=
                `
                <tr>
                  <th>r${5 - idx}</th>
                  <td class="rfm_ rfm_table_${15 - i - idx}"></td>
                  <td class="rfm_ rfm_table_${14 - i - idx}"></td>
                  <td class="rfm_ rfm_table_${13 - i - idx}"></td>
                  <td class="rfm_ rfm_table_${12 - i - idx}"></td>
                  <td class="rfm_ rfm_table_${11 - i - idx}"></td>
                </tr>
                `;
              }
              $(`#rfm_rfm${i+1}_table_cell`).html(
                `
                <thead>
                  <tr>
                    <th>m${5 - i}</th>
                    <th>f5</th>
                    <th>f4</th>
                    <th>f3</th>
                    <th>f2</th>
                    <th>f1</th>
                  </tr>
                </thead>
                <tbody>
                ${app}
                </tbody>
                `
              );
            }
          }
          const desc_table = () => {
            let data_color_arr = [];

            let ap = ``;
            for (let i = 15;i > 2;i--) {
              let result = _objs.filter(({rfm_score}) => rfm_score == i);

              let amount = result.length;
              let rate_amount = amount.to_perate(_objs.length);
              let count = result.sum_val('count');
              let hour = result.sum_val('data_4');

              let data = result.sum_val('data_0');
              let rate_data = data.to_perate(_objs.sum_val('data_0'));
              data_color_arr.push(rate_data);
              let ltv = data.to_devide(amount);
              let cup = data.to_devide(count);
              let hup = data.to_devide(hour);
              let cuc = count.to_Perate(amount);

              ap +=
              `
              <tr>
                <th>
                  <i class="fas fa-stop" style="color:rgb(242,100,100);"></i> ${i}点
                </th>
                <td>
                  <div class="amount">
                    ${amount.toLocaleString()}
                    <span class="percent">${rate_amount}%</span>
                  </div>
                  <div class="bb bb_con" style="width:${rate_amount}%;"></div>
                </td>
                <td>
                  <div class="amount">
                    ${data.str_jp()}
                    <span class="percent">${rate_data}%</span>
                  </div>
                  <div class="bb bb_con" style="width:${rate_data}%;"></div>
                </td>
                <td>¥${ltv.toLocaleString()}</td>
                <td>¥${cup.toLocaleString()}</td>
                <td>¥${hup.toLocaleString()}</td>
                <td>${cuc}回</td>
              </tr>
              `;
            }
            $('#rfm_rfm_table').html(
              `
              <thead>
                <tr>
                  <th>RFM点数</th>
                  <th>該当人数</th>
                  <th>総合売上</th>
                  <th>LTV</th>
                  <th>客単価</th>
                  <th>時間単価</th>
                  <th>平均来院数</th>
                </tr>
              </thead>
              <tbody>
                ${ap}
              </tbody>
              `
            );

            let max = data_color_arr.max_val('');
            for (let i = 15;i > 2;i--) {
              let amount = data_color_arr[15 - i];
              let rate = amount.to_Perate(max);

              $(`.rfm_table_${i}`).css('opacity',`${rate}`);
            }
          }
          const desc_excel = () => {
            $(document).off('click','#rfm_rfm_excel_btn').on('click','#rfm_rfm_excel_btn',function() {
              (() => {
                let ap = ``;

                for (let i = 15;i > 2;i--) {
                  let result = _objs.filter(({rfm_score}) => rfm_score == i);

                  let amount = result.length;
                  let rate_amount = amount.to_perate(_objs.length);
                  let count = result.sum_val('count');
                  let hour = result.sum_val('data_4');

                  let data = result.sum_val('data_0');
                  let rate_data = data.to_perate(_objs.sum_val('data_0'));
                  let ltv = data.to_devide(amount);
                  let cup = data.to_devide(count);
                  let hup = data.to_devide(hour);
                  let cuc = count.to_Perate(amount);

                  ap +=
                  `
                  <tr>
                    <th>RFM-${i}点</th>
                    <td>${amount}</td>
                    <td>${data}</td>
                    <td>${ltv}</td>
                    <td>${cup}</td>
                    <td>${hup}</td>
                    <td>${cuc}</td>
                  </tr>
                  `;
                }
                $('#rfm_rfm_table_summary').html(
                  `
                  <thead>
                    <tr>
                      <th>RFMランク</th>
                      <th>該当人数</th>
                      <th>総合売上</th>
                      <th>LTV</th>
                      <th>客単価</th>
                      <th>時間単価</th>
                      <th>平均来院数</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ap}
                  </tbody>
                  `
                );
              })();
              (() => {
                $('#rfm_rfm_table_part_base').html(``);
                let go = ["","男性","女性"];

                for (let i = 15;i > 2;i--) {
                  let ap = ``;
                  let result = _objs.filter(({rfm_score}) => rfm_score == i);

                  result.forEach((cell) => {

                    ap +=
                    `
                    <tr>
                      <th>${i}</th>
                      <th>${user_name==MSD_smn?`患者${cell.c_ptno}`:cell.c_name}</th>
                      <th>${user_name==MSD_smn?`カンジャ${cell.c_ptno}`:cell.c_kana}</th>
                      <th>${cell.tel}</th>
                      <th>${cell.mobile}</th>
                      <th>${cell.postcd}</th>
                      <th>${cell.addr1}</th>
                      <th>${cell.addr2}</th>
                      <th>${cell.email}</th>
                      <th>${cell.clinic_name}</th>
                      <th>${cell.staff_name}</th>
                      <th>${cell.age}</th>
                      <th>${go[cell.gender]}</th>

                      <th>${cell.data_0}</th>
                      <th>${cell.data_1}</th>
                      <th>${cell.data_2}</th>
                      <th>${cell.data_3}</th>
                      <th>${cell.count}</th>

                    </tr>
                    `;
                  });

                  $('#rfm_rfm_table_part_base').append(
                    `
                    <table data-sheet-name="RFM-${i}点">
                      <tr>
                        <th>RFMランク</th>
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

                        <th>総合売上</th>
                        <th>保険請求額</th>
                        <th>保険負担金</th>
                        <th>自費売上</th>
                        <th>来院回数</th>
                      </tr>
                      ${ap}
                    </table>
                    `
                  );
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
                document.querySelectorAll('#rfm_rfm_table_bases table').forEach(function (currentValue, index) {
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
                }), `RFMランク別顧客一覧${ps.str_date(`-`)}~${pe.str_date(`-`)}.xlsx`);
              })();
            });
          }

          desc_table_cell();
          desc_table();
          desc_excel();
        }

        desc_leveling();
        desc_cluster();
        desc_rf();
        desc_rfm();
      }

      distribution_checker();
      desc_content();
      $(document).off('click','#rfm_query_btn').on('click','#rfm_query_btn',function() {
        desc_content();
      });
    }

    desc_trend();
    setTimeout(() => {
      desc_segment();
      setTimeout(() => {
        desc_repeat();
        setTimeout(() => {
          desc_like_menu();
          setTimeout(() => {
            desc_decyle();
            setTimeout(() => {
              desc_rfm();
            },500);
          },500);
        },500);
      },500);
    },500);

    $(document).off('click','#open_map').on('click','#open_map',function() {
      $('#map_base .cover').hide();
      desc_map();
    });
    $('#map_base .cover').show();
  }

  desc_content_leveling();
  const desc_graph_init = (sender1,sender2,sender3,sender4) => {
    eval(`try {${sender1}.destroy();} catch(err) {}`);
    eval(`${sender2}.canvas.height = 100;`);
    eval(`${sender1} = new Chart(${sender2},{type:'${sender3}',data:{labels:"",datasets:"",},plugins:"",})`);
  }

  let trend_line;
  let male_bar;
  let female_bar;
  let cup_scatter;
  let bubble_chart;
  let count_chart;
  let sales_boxplot;
  let decyle_bar;
  let decyle_line;

  let trend_line_ctx = document.getElementById('trend_line').getContext('2d');
  desc_graph_init("trend_line","trend_line_ctx",'LineWithLine');
  let male_bar_ctx = document.getElementById('male_bar').getContext('2d');
  desc_graph_init("male_bar","male_bar_ctx",'bar');
  let female_bar_ctx = document.getElementById('female_bar').getContext('2d');
  desc_graph_init("female_bar","female_bar_ctx",'bar');
  let cup_scatter_ctx = document.getElementById('cup_scatter').getContext('2d');
  desc_graph_init("cup_scatter","cup_scatter_ctx",'scatter');
  let bubble_chart_ctx = document.getElementById('bubble_chart').getContext('2d');
  desc_graph_init("bubble_chart","bubble_chart_ctx",'bubble');
  let count_chart_ctx = document.getElementById('count_chart').getContext('2d');
  desc_graph_init("count_chart","count_chart_ctx",'bar');
  let sales_boxplot_ctx = document.getElementById('sales_boxplot').getContext('2d');
  desc_graph_init("sales_boxplot","sales_boxplot_ctx",'boxplot');
  let decyle_bar_ctx = document.getElementById('decyle_bar').getContext('2d');
  desc_graph_init("decyle_bar","decyle_bar_ctx",'bar');
  let decyle_line_ctx = document.getElementById('decyle_line').getContext('2d');
  desc_graph_init("decyle_line","decyle_line_ctx",'bar');

  desc_static_sections();
}
var query_function = async () => {
  let form = document.forms['query_form'];
  let ps = form.elements['pi_s'].value;
  let pe = form.elements['pi_e'].value;
  let pa = period_map(ps,pe,2);

  let objs = $('#obj_select option:selected').prop('value');

  (() => {
    $('#setting_ios').prop('checked',false);
    $('#setting_indi').html(
      `
      <div class="cell inline"><i class="fas fa-cogs"></i></div>
      <div class="cell inline">${ps.str_date(`.`)} - ${pe.str_date(`.`)}</div>
      <div class="cell cell_indi inline"><i class="fas fa-caret-down"></i></div>
      `
    );
  })();

  const sender_data = {
    ps:ps,
    pe:pe,
    pa:pa,
    objs:objs
  }

  $('#content_base').html(`<div class="loading_base inline"><i class="fad fa-spinner-third fa-spin"></i></div>`);
  let result = await ajax_api_function("customer_analytics",sender_data);
  if (result.dataExists) {
    desc_function(result.data,sender_data);
  } else {
    alert(`データ通信エラー:${result.reason}`);
  }
}

if ($('#page_js_status').prop('checked') == false) {
  $('#page_js_status').prop('checked',true);

  $(document).ready(async function(){
    $('.left_bar_base a:eq(12) .cell').addClass('selected');

    let clinics = await ajax_api_function("read_clinic_objs","");

    if (clinics.dataExists) {
      let option = ``;
      let all_option = ``;
      let objs = clinics.data;
      clinic_objs = clinics.data;

      objs.forEach((cell,idx) => {
        all_option += `${cell.obj_id}`;
        if (idx != objs.length - 1) all_option += `,`;
        option += `<option value="${cell.obj_id}">${cell.obj_name}</option>`;
      });

      $('#obj_select').html(`<option value="${all_option}">管轄全院</option>${option}`);

      const desc_init = async () => {
        await psln_setter(2);
        // await psl_setter(0,"pi");
        await psl_setter(1,"pi");
        await query_function();
      }
      desc_init();
    } else {
      alert(`データ通信エラー:${result.reason}`);
    }
  });
}
