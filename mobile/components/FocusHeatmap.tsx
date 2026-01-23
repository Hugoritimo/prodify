import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit'; // Biblioteca nova e correta

interface FocusHeatmapProps {
  values: { date: string; count: number }[];
}

export function FocusHeatmap({ values }: FocusHeatmapProps) {
  const screenWidth = Dimensions.get('window').width;

  // Configuração das cores (Estilo Hacker / GitHub Dark)
  const chartConfig = {
    backgroundGradientFrom: "#1E1E1E",
    backgroundGradientTo: "#1E1E1E",
    color: (opacity = 1) => `rgba(0, 255, 65, ${opacity})`, // Verde Matrix
    strokeWidth: 2, // opcional
    barPercentage: 0.5,
    propsForLabels: {
        fill: "#888", // Cor dos textos (Jan, Fev...)
        fontSize: 10,
        fontWeight: "bold"
    }
  };

  // Tratamento de erro: Se a lista vier vazia, cria um dia falso zerado
  // Isso evita que o gráfico quebre a aplicação
  const data = values.length > 0 ? values : [{ date: new Date().toISOString().split('T')[0], count: 0 }];

  // Define a data final como hoje
  const endDate = new Date();

  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <Text style={{ color: '#fff', marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>
        XP & Consistência
      </Text>
      
      <ContributionGraph
        values={data}
        endDate={endDate}
        numDays={95} // Mostra +- os últimos 3 meses
        width={screenWidth - 30}
        height={220}
        chartConfig={chartConfig}
        gutterSize={1.5} // Espaço entre os quadradinhos
        bgColor={"transparent"}
        squareSize={20} // Tamanho do quadradinho
        getMonthLabel={(monthIndex) => {
            const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
            return months[monthIndex];
        }}
        tooltipDataAttrs={(value) => ({
            // Isso ajuda na acessibilidade e debugging
            'data-tooltip': `${value.date}: ${value.count} XP` 
        })}
      />
    </View>
  );
}