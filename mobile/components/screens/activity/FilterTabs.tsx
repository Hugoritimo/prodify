import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../constants/theme';

interface Tab {
  id: string;
  label: string;
}

interface FilterTabsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabPress: (tabId: string) => void;
}

export function FilterTabs({ tabs, activeTabId, onTabPress }: FilterTabsProps) {
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTabId === tab.id && styles.tabActive]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text style={[styles.tabText, activeTabId === tab.id && styles.tabTextActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.text,
  },
});
