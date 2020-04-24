export function addCluster(map, GeojsonData, property) {
  map.addSource('cluster', {
    type: 'geojson',
    data: GeojsonData,
    cluster: true, // 打开聚合
    clusterRadius: 50, // 设置聚合的半径
    clusterProperties: {
      confirmed: ['+', ['get', 'confirmed']],
      exist: ['+', ['get', 'exist']],
      cured: ['+', ['get', 'cured']],
      dead: ['+', ['get', 'dead']]
    } // 设置聚合过程中需要处理的数据
  });
  map.addLayer(
    {
      id: 'cluster',
      type: 'circle',
      source: 'cluster',
      layout: {
        'visibility': 'none'
      },
      filter: ['>=', ['get', property], 1],
      paint: {
        'circle-radius': [
          'step',
          ['get', property],
          10, 10,
          20, 1000,
          30, 5000,
          40
        ],
        'circle-color': [
          'step',
          ['get', property],
          '#9ad5ff', 0,
          '#9af6ff', 20,
          'cyan', 200,
          'yellow', 400,
          '#f1f075', 800,
          '#f9b196', 1000,
          '#f28cb1', 50000,
          'red'
        ]
      }
    },
    'waterway-label'
  );

  map.addLayer({
    id: 'clusters-count',
    type: 'symbol',
    source: 'cluster',
    filter: ['>=', ['get', property], 1],
    layout: {
      'text-field': `{${property}}`,
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
      'text-allow-overlap': true,
      'visibility': 'none'
    }
  }, 'waterway-label')
}