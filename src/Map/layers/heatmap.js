export function addHeatMap(map, GeojsonData) {
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
          ['get', 'confirmedNum'],
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
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 2,
          1, 4,
          2, 8,
          3, 16,
          4, 32,
          5, 64,
          6, 128,
          7, 256,
          8, 512,
          9, 1024,
          10, 2048,
          11, 4096,
          17, 131072
        ],
        // 热力图的透明度
        'heatmap-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          5, 0.95,
          6, 0.5
        ]
      }
    },
    'waterway-label'
  );
};