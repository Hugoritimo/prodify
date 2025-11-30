import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../constants/theme';

interface MenuItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

interface MenuListProps {
  items: MenuItem[];
  onItemPress?: (item: MenuItem) => void;
}

export function MenuList({ items, onItemPress }: MenuListProps) {
  return (
    <View style={styles.menuContainer}>
      {items.map((item, index) => (
        <TouchableOpacity 
          key={item.id} 
          style={[
            styles.menuItem,
            index === items.length - 1 && styles.menuItemLast
          ]}
          activeOpacity={0.7}
          onPress={() => onItemPress?.(item)}
        >
          <View style={styles.menuItemLeft}>
            <View style={styles.menuItemIcon}>
              <Ionicons name={item.icon} size={22} color={colors.textSecondary} />
            </View>
            <Text style={styles.menuItemText}>{item.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.inactive} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    borderRadius: 18,
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLight,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
});
