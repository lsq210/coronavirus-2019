const HEAT_MAP_RATE = 3;
export function addHeatMap(map, GeojsonData, initialDate) {
  map.addSource('coronavirus', {
    'type': 'geojson',
    'data': GeojsonData
  });
  map.addLayer(
    {
      'id': 'heatmap',
      'type': 'heatmap',
      'source': 'coronavirus',
      // 'maxzoom': 9,
      'paint': {
        // 热力权重，适用于集合图
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'confirmed'],
          0, 0,
          1000, 1
        ],
        // 全局控制热力权重
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 3,
          9, 5
        ],
        // 热力图配色范围
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, "rgba(0, 0, 0, 0)",
          0.1, "#927903",
          0.15, "#ffd403",
          1, "red"
        ],
        // 每个热力点的绘制半径
        'heatmap-radius':
          [
            'interpolate',
            ['linear'],
            // ['zoom'],
            ['get', 'confirmed'],
            0, 0 * HEAT_MAP_RATE,
            1, 4 * HEAT_MAP_RATE,
            10000, 10 * HEAT_MAP_RATE
          ],
        // 热力图的透明度
        // 'heatmap-opacity': [
        //   'interpolate',
        //   ['linear'],
        //   ['zoom'],
        //   5, 0.6,
        //   6, 0.5
        // ]
        'heatmap-opacity': 0.6
      }
    },
    'waterway-label'
  );
  map.setFilter('heatmap', ['==', 'date', initialDate]);
};