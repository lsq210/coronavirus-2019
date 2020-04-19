export function addCluster(map, GeojsonData) {
  console.log('tianjia')
  map.addSource('cluster', {
    type: 'geojson',
    data: GeojsonData,
    cluster: true, // 打开聚合
    clusterRadius: 50, // 设置聚合的半径
    clusterProperties: { 'confirmedNum': ["+", ["get", "confirmedNum"]] } // 设置聚合过程中需要处理的数据
  });
  map.addLayer(
    {
      id: 'cluster',
      type: 'circle',
      source: 'cluster',
      layout: {
        'visibility': 'none'
      },
      filter: ['>=', ['get', 'confirmedNum'], 1],
      paint: {
        'circle-radius': [
          'step',
          ['get', 'confirmedNum'],
          10, 10,
          20, 1000,
          30, 5000,
          40
        ],
        'circle-color': [
          'step',
          ['get', 'confirmedNum'],
          '#9ad5ff', 10,
          '#9af6ff', 1000,
          'cyan', 2000,
          '#f1f075'
        ]
      }
    },
    'waterway-label'
  );

  map.addLayer({
    id: `clusters-count`,
    type: 'symbol',
    source: `cluster`,
    filter: ['>=', ['get', 'confirmedNum'], 1],
    layout: {
      'text-field': '{confirmedNum}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
      'text-allow-overlap': true,
      'visibility': 'none'
    }
  }, 'waterway-label')
}