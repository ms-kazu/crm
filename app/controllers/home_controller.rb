class HomeController < ApplicationController
  before_action :authenticate_user
  layout 'application'

  def index
  end
  def index_sp
  end
  def summary
  end
  def achieve_summary
  end
  def remarkable_points
  end
  def trends_line
    @s_type = params[:s_type]
  end
  def sales_forecast
    @s_type = params[:s_type]
  end
  def custom_field
  end
  def achieve_analytics
    @s_type = params[:st]
    @s_select = params[:ss]
    @s_id = params[:si]
    @p_type = params[:pt]
    @p_select = params[:psel]
    @ps = params[:ps]
    @pe = params[:pe]
    @b_type = params[:bt]
    @m_type = params[:mt]
    @m_select = params[:ms]
    @m_id = params[:mi]
  end
  def random_stome
  end
  def customer_analytics
  end
  def customer_search
  end
  def customer
    @cid = params[:cid]
    @ptno = params[:ptno]
    @cname = params[:cname]
  end

  require 'net/http'

  def api_gate_action(sender1,sender2,sender3)
      rawURL = session[:db_url] + sender1
      url = URI.parse(rawURL)
      req = Net::HTTP::Post.new(url.path)
      req.set_form_data({"sender" => sender2,"db" => sender3})
      response = Net::HTTP.new(url.host, url.port).start do |http|
          http.request(req)
      end
      case response
          when Net::HTTPSuccess
          @result = JSON.parse(response.body)
          data = {:results => @result}
          respond_to do |f|
              f.json {render json: data}
          end
          when Net::HTTPRedirection
          else
      end
  end

  def ajaxAPIAction
      api_gate_action(params[:sender1],params[:sender2],session[:db])
  end
end
