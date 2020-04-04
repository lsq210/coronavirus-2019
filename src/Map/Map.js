import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import GeojsonData from '../data/all.geojson'
import { addHeatMap } from './layers/heatmap'
import { addCluster } from './layers/cluster'
import { addCategory } from './layers/category'
import './Map.css'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibHNxMjEwIiwiYSI6ImNqZXd6NzVyYzB6b24ydnBzOWFhZ3FpNTQifQ.y4iy69PepyhrkJ98qjzykg';
const allLayers = ['heatmap', 'colorfill', 'category', 'cluster'];
class Map extends Component {
  constructor(props) {
    super(props);
  };
  componentDidMount() {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
      center: [74.2, 10.6],
      zoom: 1.5,
      hash: true,
    });
    addHeatMap(this.map, GeojsonData);
    addCluster(this.map, GeojsonData);
    addCategory(this.map, GeojsonData);
  };
  componentDidUpdate(prevProps) {
    console.log('this.props.layers', this.props.layers);
    if (this.props.layers !== prevProps.layers) {
      this.changeLayer();
    }
  };
  changeLayer() {
    const { layers } = this.props
    allLayers.forEach(layer => {
      // 图层未被选中
      if (layers.findIndex(l => l === layer) === -1) {
        if (layer === 'cluster') {
          this.map.setLayoutProperty('cluster', 'visibility', 'none');
          this.map.setLayoutProperty('clusters-count', 'visibility', 'none');
        } else {
          this.map.setLayoutProperty(layer, 'visibility', 'none');
        }
      } else { // 图层被选中
        if (layer === 'cluster') {
          this.map.setLayoutProperty('cluster', 'visibility', 'visible');
          this.map.setLayoutProperty('clusters-count', 'visibility', 'visible');
        } else {
          this.map.setLayoutProperty(layer, 'visibility', 'visible');
        }
      }
    });
    this.map.triggerRepaint();
  }
  addLayer(layer) {
    switch (layer) {
      case allLayers[0]:
        addHeatMap(this.map);
        return;
      case allLayers[3]:
        addCluster(this.map);
        return;
      default:
        return;
    }
  }
  render() {
    return (
      <div id="map"></div>
    )
  }
}

export default Map;