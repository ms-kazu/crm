class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  config.api_only = false
  before_action :set_current_user

  def set_current_user
    if session[:user_id]
      @name = session[:user_name]
      @clinic_ids = session[:clinic_ids]
      @current_user_id = session[:user_id]
      @inc_name = session[:inc_name]
      @clt_id = session[:clt_id]
    end
  end

  def authenticate_user
    if @current_user_id == nil
      flash[:notice_nega] = "アクセスするにはログインが必要です"
      redirect_to('/')
    end
  end

  def currenter_user
    if session[:user_id]
      redirect_to(session[:home])
    end
  end
end
