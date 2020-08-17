import axios from 'axios'

//all
const fetchData = () => {
    return dispatch => {
      axios.get(`https://covid19.mathdro.id/api`)
        .then(res => res)
        .then(res => {
          dispatch({
            type: 'FETCH_DATA',
            payload: res.data
          })
        })
    }
  }
  
// const fetchData = () => {
//     axios.get(`https://covid19.mathdro.id/api`)
//     .then(res => res)
//     .then(res => res.data)
// }

  export {
      fetchData
  }