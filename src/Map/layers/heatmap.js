const HEAT_MAP_RATE = 3;
export function addHeatMap(map, GeojsonData, property) {
  map.addSource('heatmap', {
    type: 'geojson',
    data: GeojsonData
  });
  map.addLayer(
    {
      'id': 'heatmap',
      'type': 'heatmap',
      'source': 'heatmap',
      // 'maxzoom': 9,
      'paint': {
        // 热力权重，适用于集合图
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', property],
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
            ['zoom'],
            // ['get', 'confirmed'],
            // 0, 0 * HEAT_MAP_RATE,
            // 1, 4 * HEAT_MAP_RATE,
            // 10000, 10 * HEAT_MAP_RATE
            0, 2 * HEAT_MAP_RATE,
            1, 4 * HEAT_MAP_RATE,
            2, 8 * HEAT_MAP_RATE,
            3, 16 * HEAT_MAP_RATE,
            4, 32 * HEAT_MAP_RATE,
            5, 64 * HEAT_MAP_RATE,
            6, 128 * HEAT_MAP_RATE,
            7, 256 * HEAT_MAP_RATE,
            8, 512 * HEAT_MAP_RATE,
            9, 1024 * HEAT_MAP_RATE,
            10, 2048 * HEAT_MAP_RATE,
            11, 4096 * HEAT_MAP_RATE,
            17, 131072 * HEAT_MAP_RATE
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
};