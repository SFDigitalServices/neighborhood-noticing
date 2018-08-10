import axios from 'axios'

function Citygram (citygramUrl, citygramTag) {
  const citygram = axios.create({
    baseURL: citygramUrl
  })

  return {
    getEvent: function (id) {
      return citygram.get('/events/' + id).then(function (response) {
        return Object.assign({
          geometry: JSON.parse(response.data.geom),
          type: 'Feature'
        }, response.data)
      })
    },
    getEvents: function (geometry) {
      return citygram.get('/publishers', {
        query: {
          tag: citygramTag
        }
      }).then(function (response) { // query for events from all tagged publishers
        return Promise.all(response.data.map(function (publisher) {
          return citygram.get('/publishers/' + publisher.id + '/events', {
            params: {
              geometry
            }
          }).then(function (response) {
            return response.data.map(function (e) {
              e.geometry = JSON.parse(e.geom)
              e.type = 'Feature'
              return e
            })
          })
        })).then(function (publisherEvents) {
          return publisherEvents.reduce(function(acc, val) {
            return acc.concat(val)
          }, [])
        })
      })
    }
  }
}

export default Citygram
