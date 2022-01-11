Rails.application.config.assets.version = '1.0'
Rails.application.config.assets.paths << Rails.root.join('node_modules')

Rails.configuration.assets.precompile += %w[serviceworker.js manifest.json]

Rails.configuration.assets.precompile += %w[summary.js]
Rails.configuration.assets.precompile += %w[achieve_summary.js]
Rails.configuration.assets.precompile += %w[remarkable_points.js]
Rails.configuration.assets.precompile += %w[trends_line.js]
Rails.configuration.assets.precompile += %w[sales_forecast.js]
Rails.configuration.assets.precompile += %w[custom_field.js]

Rails.configuration.assets.precompile += %w[achieve_analytics.js]
Rails.configuration.assets.precompile += %w[random_stome.js]

Rails.configuration.assets.precompile += %w[customer_analytics.js]
Rails.configuration.assets.precompile += %w[customer_search.js]
Rails.configuration.assets.precompile += %w[customer.js]

Rails.configuration.assets.precompile += %w[keyword_setter.js]
Rails.configuration.assets.precompile += %w[mission_setter.js]
Rails.configuration.assets.precompile += %w[calendar_setter.js]

Rails.configuration.assets.precompile += %w[jquery_login_bgv.min.js]
