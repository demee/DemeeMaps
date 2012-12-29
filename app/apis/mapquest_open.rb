module MapApi
  class MapquestOpen
    include HTTParty
    base_uri 'open.mapquestapi.com'

    def search(search_query)
      params = {
        format: 'json',
        q: search_query
      }

      url = '/nominatim/v1/search.php?' + params.to_query

      Rails.logger.info 'Requesting: http://open.mapquestapi.com' + url

      self.class.get(url)
    end
  end
end
