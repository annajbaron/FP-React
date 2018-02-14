import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Collection} from '../requests/collections';
import CollectionDetail from './collection_detail';
import CollectionOverview from './collection_overview';

class CollectionPage extends Component {
  componentDidMount() {
    Collection
      .all()
      .then((res) => {
        this.props.getCollections(res);
      })
  }

  renderList() {
    return this.props.collections.map((collection, i) => {
      const collectionimg = collection.name.replace( /\s/g, "").toLowerCase();
      return (
        <CollectionOverview
          key={i}
          collection={collection}
          collectionimg={collectionimg}
        />
      );
    });
  }

  render() {
    const {collections} = this.props;
    if (collections){
      return(
        <div className="page">
          <h1 className="page-header">COLLECTIONS 2017</h1>
          <div className="collection-list">
            {this.renderList()}
          </div>
          <CollectionDetail />
        </div>
      )} else {
        return <div/>;
      }
  }
}

function mapStateToProps(state) {
  return {
    collections: state.collections ? state.collections : null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCollections: collections => dispatch(actions.getCollections(collections)),
    selectCollection: collection => dispatch(actions.selectCollection(collection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);
