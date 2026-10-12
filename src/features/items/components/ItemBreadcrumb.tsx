
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';


interface ItemBreadcrumbProps {
  category: string;
  starting?: boolean;
}

export function ItemBreadcrumb({
  category,
  starting = false
}: ItemBreadcrumbProps) {
  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 300 110"
        preserveAspectRatio="xMidYMid meet"
        style={StyleSheet.absoluteFill}
      >
        {/* Contorno externo */}
        {
            starting ?
            <Polygon points="25,1 275,1 300,55 275,109 25,109 0,55" fill="#51412C"/> :
            <Polygon points="0,1 275,1 300,55 275,109 0,109 25,55" fill="#51412C"/>
        }
        

        {/* Fundo da placa */}
        {
            starting ?
            <Polygon points="27,3 273,3 297,55 274,107 27,107 3,55" fill="#29231B"/> :
            <Polygon points="2,3 273,3 297,55 274,107 2,107 27,55" fill="#29231B"/>
        }
        

        {/* Detalhes metálicos */}
        {
            starting ?
            <>
                <Path
                    d="M 27 7 L 271 7 L 294 55"
                    stroke="#be924f"
                    strokeWidth={0.7}
                    fill="none"
                />

                <Path
                    d="M 294 55 L 271 103 L 27 103"
                    stroke="#664728"
                    strokeWidth={0.7}
                    fill="none"
                />
            </>:
            <>
                <Path
                    d="M 6 7 L 271 7 L 294 55"
                    stroke="#be924f"
                    strokeWidth={0.7}
                    fill="none"
                />

                <Path
                    d="M 294 55 L 271 103 L 6 103"
                    stroke="#664728"
                    strokeWidth={0.7}
                    fill="none"
                />
            </>
        }
        
      </Svg>

      <View style={styles.content}>
        <View style={styles.segment}>
            <Text style={styles.category} numberOfLines={1}>
            {category}
            </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    position: 'relative',
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    width: '100%',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    
    paddingHorizontal: 16,
  },
  segment: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    color: '#B5A17B',
    fontSize: 12,
    flexShrink: 1,
  },
});
