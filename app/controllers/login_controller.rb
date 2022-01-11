class LoginController < ApplicationController
  layout 'login'

  before_action :currenter_user,{only:[:index]}
  protect_from_forgery :except => [:login_action]

  require 'net/http'

  def index
  end

  def login_action
      @email = params[:email]
      @password = params[:password]
      @width = params[:width]
      url = URI.parse(ENV['DB_SERVER_URL'])
      req = Net::HTTP::Post.new(url.path)
      req.set_form_data({"email" => @email, "password" => @password})
      response = Net::HTTP.new(url.host, url.port).start do |http|
          http.request(req)
      end
      case response
          when Net::HTTPSuccess
          @result = JSON.parse(response.body)
          origin =  @result["db_i_origin"]
          if origin
            session[:db] =
              '{"db_i_0":"' + @result["db_i_0"] +
              '","db_i_1":"' + @result["db_i_1"] +
              '","db_i_2":"' + @result["db_i_2"] +
              '","db_i_3":"' + @result["db_i_3"] +
              '","db_i_4":"' + @result["db_i_4"] +
              '","db_i_5":"' + @result["db_i_5"] +
              '","db_i_6":"' + @result["db_i_6"] +
              '","db_i_7":"' + @result["db_i_7"] +
              '","db_i_8":"' + @result["db_i_8"] +
              '"}'
            session[:db_url] = @result["db_i_3"]
            session[:clinic_ids] = @result["db_i_4"]
            session[:user_id] = @result["db_i_5"]
            session[:user_name] = @result["db_i_6"]
            session[:clt_id] = @result["db_i_7"]
            session[:inc_name] = @result["inc_name"]

            flash[:notice_pos] = "ログインしました"

            session[:home] = "/home"
            redirect_to(session[:home])
          else
            flash[:notice_nega] = "emailまたはパスワードが間違っています"
            redirect_to("/")
          end
          when Net::HTTPRedirection
          else
      end
  end

  def change_acount
    @client_id = params[:acount_select]
    rawURL = session[:db_url] + "change_acount"
    url = URI.parse(rawURL)
    req = Net::HTTP::Post.new(url.path)
    req.set_form_data({"client_id" => @client_id})
    response = Net::HTTP.new(url.host, url.port).start do |http|
        http.request(req)
    end
    case response
        when Net::HTTPSuccess
        @result = JSON.parse(response.body)
        origin =  @result["db_i_origin"]
        if origin
          session[:db] =
            '{"db_i_0":"' + @result["db_i_0"] +
            '","db_i_1":"' + @result["db_i_1"] +
            '","db_i_2":"' + @result["db_i_2"] +
            '","db_i_3":"' + @result["db_i_3"] +
            '","db_i_4":"' + @result["db_i_4"] +
            '","db_i_8":"' + @result["db_i_8"] +
            '"}'
          session[:db_url] = @result["db_i_3"]
          session[:clinic_ids] = @result["db_i_4"]
          session[:inc_name] = @result["inc_name"]

          flash[:notice_pos] = "アカウントを変更しました"

          session[:home] = "/summary"
          redirect_to(session[:home])
        else
          flash[:notice_nega] = "アカウントを変更できませんでした"
          redirect_to("/summary")
        end
        when Net::HTTPRedirection
        else
    end
  end

  def logout_action
      session[:db] = nil
      session[:db_url] = nil
      session[:clinic_ids] = nil
      session[:user_id] = nil
      session[:user_name] = nil
      session[:clt_id] = nil
      flash[:notice_pos] = "ログアウトしました"
      redirect_to("/")
  end
end
