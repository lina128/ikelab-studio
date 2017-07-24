import { connect } from 'react-redux'
import PrintView from '../components/PrintView'

const mapStateToProps = (state) => {
  return {
    experiment: state.design.present
  }
}

export default connect(mapStateToProps, null)(PrintView)
