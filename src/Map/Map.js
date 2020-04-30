import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { addHeatMap } from './layers/heatmap';
import { addCluster } from './layers/cluster';
import { addCategory } from './layers/category';
import getGeojson from '../data/getGeojson';
import './Map.css';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibHNxMjEwIiwiYSI6ImNqZXd6NzVyYzB6b24ydnBzOWFhZ3FpNTQifQ.y4iy69PepyhrkJ98qjzykg';
const layerOptions = ['heatmap', 'category', 'cluster'];
var geojson = null;
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  };
  async componentDidMount() {
    geojson = await (getGeojson());
    const initialData = {
      type: geojson.type,
      features: geojson.features.filter(e => e.properties.date === this.props.date)
    }
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
      center: [74.2, 10.6],
      zoom: 1.5,
      hash: true,
    });
    this.map.on('load', () => {
      addHeatMap(this.map, initialData, 'exist');
      addCluster(this.map, initialData, 'exist');
      addCategory(this.map, initialData);
    })
  };
  componentDidUpdate(prevProps) {
    const { layers, property, date } = this.props;
    if (layers !== prevProps.layers) {
      this.changeLayer();
    }
    if (property !== prevProps.property) {
      this.changeProperty();
    }
    if (date !== prevProps.date) {
      const newData = {
        type: geojson.type,
        features: geojson.features.filter(e => e.properties.date === date)
      };
      this.map.getSource('heatmap').setData(newData);
      this.map.getSource('cluster').setData(newData);
      this.map.getSource('category').setData(newData);
    }
  };
  changeLayer() {
    const layers = this.props.layers;
    const map = this.map;
    layerOptions.forEach(layer => {
      // 图层未被选中
      if (layers.findIndex(l => l === layer) === -1) {
        if (layer === 'cluster') {
          map.setLayoutProperty('cluster', 'visibility', 'none');
          map.setLayoutProperty('clusters-count', 'visibility', 'none');
        } else {
          map.setLayoutProperty(layer, 'visibility', 'none');
        }
      } else { // 图层被选中
        if (layer === 'cluster') {
          map.setLayoutProperty('cluster', 'visibility', 'visible');
          map.setLayoutProperty('clusters-count', 'visibility', 'visible');
        } else {
          map.setLayoutProperty(layer, 'visibility', 'visible');
        }
      }
    });
  }
  changeProperty() {
    const { property, date } = this.props;
    const layer = property.split(',')[0];
    const value = property.split(',')[1];
    const map = this.map;
    const newData = {
      type: geojson.type,
      features: geojson.features.filter(e => e.properties.date === date)
    };
    switch (layer) {
      case 'heatmap':
        map.removeLayer('heatmap');
        map.removeSource('heatmap');
        addHeatMap(map, newData, value);
        return;
      case 'cluster':
        map.removeLayer('cluster');
        map.removeLayer('clusters-count');
        map.removeSource('cluster');
        addCluster(map, newData, value);
        map.setLayoutProperty('cluster', 'visibility', 'visible');
        map.setLayoutProperty('clusters-count', 'visibility', 'visible');
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