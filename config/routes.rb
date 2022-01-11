Rails.application.routes.draw do
  get 'home_sp/index'
  get '/' => 'login#index'
  post '/login_action' => 'login#login_action'
  post '/logout_action' => 'login#logout_action'
  post '/change_acount' => 'login#change_acount'

  get '/home' => 'home#index'

  get '/summary' => 'home#summary'
  get '/achieve_summary' => 'home#achieve_summary'
  get '/remarkable_points' => 'home#remarkable_points'
  get '/trends_line' => 'home#trends_line'
  get '/sales_forecast' => 'home#sales_forecast'
  get '/custom_field' => 'home#custom_field'

  get '/achieve_analytics' => 'home#achieve_analytics'
  get '/random_stome' => 'home#random_stome'

  get '/customer_analytics' => 'home#customer_analytics'
  get '/customer_search' => 'home#customer_search'
  get '/customer' => 'home#customer'
  get '/customer_mini/:cid/:ptno/:cname' => 'home_sp#customer_mini'

  get '/mission' => 'setting#mission'
  get '/keyword' => 'setting#keyword'
  get '/calendar' => 'setting#calendar'

  get '/home/ajax_api' => 'home#ajaxAPIAction'
  get '*anything' => 'errors#routing_error'
end

