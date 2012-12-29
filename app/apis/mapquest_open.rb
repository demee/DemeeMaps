module MapApi
  class MapquestOpen
    include HTTParty
    base_uri 'open.mapquestapi.com'

    def search(search_query)
      params = {
        format: 'json',
        q: search_query
      }

      uri = '/nominatim/v1/search.php?' + params.to_query

      Rails.logger.info 'Requesting: http://open.mapquestapi.com' + uri

      self.class.get(uri)
    end

    def directions(location_list)
      params = {
        outFormat: 'json',
        from: location_list[0],
        to: location_list[1],
        ambiguities: 'ignore'
      }

      uri = '/directions/v1/route?' + params.to_query

      Rails.logger.info 'Requesting http://open.mapquestapi.com' + uri

      self.class.get(uri).parsed_response

    end
  end
end
