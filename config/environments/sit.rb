EarthdataSearchClient::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # Code is not reloaded between requests
  config.cache_classes = true

  config.eager_load = true

  # Full error reports are disabled and caching is turned on
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Disable Rails's static asset server (Apache or nginx will already do this)
  config.serve_static_files = true

  # Compress JavaScripts and CSS
  config.assets.compress = true
  config.assets.css_compressor = :sass
  config.assets.js_compressor = :uglify

  # Don't fallback to assets pipeline if a precompiled asset is missed
  config.assets.compile = false

  # Generate digests for assets URLs
  config.assets.digest = true

  # Defaults to nil and saved in location specified by config.assets.prefix
  # config.assets.manifest = YOUR_PATH

  # Specifies the header that your server uses for sending files
  # config.action_dispatch.x_sendfile_header = "X-Sendfile" # for apache
  # config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect' # for nginx

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  config.force_ssl = false

  # See everything in the log (default is :info)
  # config.log_level = :debug

  # Prepend all log lines with the following tags
  # config.log_tags = [ :subdomain, :uuid ]

  # Use a different logger for distributed setups
  # config.logger = ActiveSupport::TaggedLogging.new(SyslogLogger.new)

  # Use a different cache store in production
  # config.cache_store = :mem_cache_store

  # Enable serving of images, stylesheets, and JavaScripts from an asset server
  # config.action_controller.asset_host = "http://assets.example.com"

  # Precompile additional assets (application.js, application.css, and all non-JS/CSS are already added)
  config.assets.precompile += ['search.js', 'data_access.js', 'account.js', 'cwic_granule.js', 'projects.js']

  # Disable delivery errors, bad email addresses will be ignored
  # config.action_mailer.raise_delivery_errors = false

  # Enable threaded mode
  # config.threadsafe!

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation can not be found)
  config.i18n.fallbacks = true

  # Send deprecation notices to registered listeners
  config.active_support.deprecation = :notify

  # Log the query plan for queries taking more than this (works
  # with SQLite, MySQL, and PostgreSQL)
  # config.active_record.auto_explain_threshold_in_seconds = 0.5

  config.gather_metrics = true
  config.analytics_id = 'UA-50960810-1'
  config.tag_manager_id = 'GTM-WNP7MLF'
  config.logo_name = "SIT"
  config.env_name = "[SIT]"
  config.tophat_url = "https://cdn.uat.earthdata.nasa.gov/tophat2/tophat2.js"
  config.feedback_url = 'https://fbm.earthdata.nasa.gov/for/EDSC-SIT/feedback.js'

  config.url_limit = 2000
  config.cmr_env = 'sit'
  services = config.services
  config.urs_client_id = services['urs'][Rails.env.to_s][services['earthdata'][config.cmr_env]['urs_root']]

  # This is also the client ID sent to OpenSearch. It is kept the same since the OpenSearch endpoint ultimately
  # talks to ECHO/CMR.
  config.cmr_client_id = ENV['cmr_client_id'] || 'edsc-prod'


  # Remove coloring from logs
  config.colorize_logging = false
end
