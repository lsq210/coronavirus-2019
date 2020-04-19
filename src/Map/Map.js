import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import GeojsonData from '../data/overall.json'
import testData from '../data/all.geojson';
import { addHeatMap } from './layers/heatmap'
import { addCluster } from './layers/cluster'
import { addCategory } from './layers/category'
import './Map.css'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibHNxMjEwIiwiYSI6ImNqZXd6NzVyYzB6b24ydnBzOWFhZ3FpNTQifQ.y4iy69PepyhrkJ98qjzykg';
const allLayers = ['heatmap', 'colorfill', 'category', 'cluster'];
const originData = {
  type: "FeatureCollection",
  features: GeojsonData.features.filter(e => e.properties.date === '2020-02-10')
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
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
    this.map.on('load', () => {
      // addHeatMap(this.map, originData);
      // addCluster(this.map, originData);
      addHeatMap(this.map, testData);
      addCluster(this.map, testData);
    })
    addCategory(this.map, testData);
  };
  componentDidUpdate(prevProps) {
    if (this.props.layers !== prevProps.layers) {
      this.changeLayer();
    }
    if (this.props.date !== prevProps.date) {
      this.setState({
        data: {
          type: "FeatureCollection",
          features: GeojsonData.features.filter(e => e.properties.date === this.props.date)
        }
      })
      this.changeSource(this.state.data);
      console.log(this.state.data)
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
  changeSource(data) {
    if (this.map.getLayer('heatmap')) {
      this.map.removeLayer('heatmap');
    }
    if (this.map.getSource('coronavirus')) {
      this.map.removeSource('coronavirus');
    }
    addHeatMap(this.map, data);
    console.log('layer', data);
  }
  render() {
    return (
      <div id="map"></div>
    )
  }
}

export default Map;