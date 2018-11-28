import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart, XAxis, Grid, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
export default class GraphFinacial extends React.PureComponent {
  static navigationOptions = {
    title: 'Money saved',
  };

  render() {
    const data = [
      {
        value: 50,
        label: 'Mon',
      },
      {
        value: 10,
        label: 'Tue',
      },
      {
        value: 40,
        label: 'Wed',
      },
      {
        value: 95,
        label: 'Thur',
      },
      {
        value: 85,
        label: 'Fri',
      },
    ]

    return (
      <View style={{ flexDirection: 'column', height: 200, paddingVertical: 16 }}>
 
        <BarChart
          style={{ flex: 1, marginLeft: 8 }}
          data={data}

          yAccessor={({ item }) => item.value}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid />
        </BarChart>

        <XAxis
                    data={data}
                    svg={{
                        fill: 'black',
                        fontSize: 8,
                        fontWeight: 'bold',
                        rotation: 20,
                        originY: 30,
                        y: 5,
                    }}
                    xAccessor={({ item }) => item.date}
                    scale={scale.scaleTime}
                    numberOfTicks={6}
                    style={{ marginHorizontal: -15, height: 20 }}
                    contentInset={{ left: 10, right: 25 }}
                  />
       
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
