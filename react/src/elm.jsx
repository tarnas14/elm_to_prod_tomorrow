import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.initialize = this.initialize.bind(this)
  }

  shouldComponentUpdate() {
    return false
  }

  initialize(node) {
    if (!node === null) {
      return
    }

    const app = this.props.src.embed(node, this.props.flags)

    if (typeof this.props.ports !== 'undefined') {
      this.props.ports(app.ports)
    }
  }

  render() {
    return React.createElement('div', { ref: this.initialize });
  }
}
