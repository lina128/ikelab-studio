import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Spinner from 'react-mdl/lib/Spinner'
import {
  Card,
  CardTitle,
  CardText
} from 'react-mdl/lib/Card'
import { List, WindowScroller, AutoSizer } from 'react-virtualized'
import './Studio.scss'

export default class Studio extends PureComponent {
  constructor (props) {
    super(props)

    this.width = 0
    this.height = 0
    this.gutterSize = 20
    this.rowCount = 84
    this.columnCount = 3
    this.rowHeight = 240
    this.columnWidth = 320

    this._rowRenderer = this._rowRenderer.bind(this)
    this._onResize = this._onResize.bind(this)
    this._calculateRowColumnCount = this._calculateRowColumnCount.bind(this)
    this._renderAutoSizer = this._renderAutoSizer.bind(this)
    this._renderList = this._renderList.bind(this)
  }

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    experiments: PropTypes.array.isRequired
  }

  _rowRenderer ({ key, index, isScrolling, isVisible, style }) {
    const child = []
    let datum

    let start = index * this.columnCount
    let end = start + this.columnCount

    if (end > this.props.experiments.length) {
      end = this.props.experiments.length
    }

    for (let i = start; i < end; i++) {
      datum = this.props.experiments[i]

      child.push(
        <div key={i} style={{ width:'auto', padding:this.gutterSize, float:'left', display:'inline-block' }}>
          <Link to={`/design/${datum.experiment_id}`}>
            <Card shadow={0}>
              <CardTitle>{datum.experiment_id}</CardTitle>
              <CardText>{moment(datum.modified_at).local().format('MM/D/YYYY hh:mm a')}</CardText>
            </Card>
          </Link>
        </div>
      )
    }

    return (
      <div key={key} style={style}>
        { child }
      </div>
    )
  }

  _calculateRowColumnCount () {
    this.columnCount = Math.floor(this.width / (this.columnWidth + 2 * this.gutterSize))
    this.rowCount = Math.ceil(this.props.experiments.length / this.columnCount)
  }

  _onResize ({ height, width }) {
    this.width = width

    this._calculateRowColumnCount()
  }

  _renderList () {
    return (
      <List
        ref='List'
        className='studio_list'
        overscanRowCount={10}
        height={this.height}
        width={this.width}
        rowCount={this.rowCount}
        rowHeight={this.rowHeight}
        rowRenderer={this._rowRenderer} />
    )
  }

  _renderAutoSizer ({ height, isScrolling, scrollTop }) {
    this.height = height

    return (
      <AutoSizer disableHeight onResize={this._onResize}>
        {this._renderList}
      </AutoSizer>
    )
  }

  render () {
    const { isFetching } = this.props

    return (
      <div>
        { isFetching ? <Spinner />
          : <WindowScroller>
            {this._renderAutoSizer}
          </WindowScroller>}
      </div>
    )
  }
}
