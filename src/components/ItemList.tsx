import type { ReactNode } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { AppColors } from "../theme/colors"

type ItemListProps = {
    title: string, 
    desctiption?: string, 
    leading?: ReactNode, 
    trailing?: ReactNode, 
    onPress?: () => void
}

export default function ItemList({
    title, 
    desctiption,
    leading, 
    trailing, 
    onPress, 
} : ItemListProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled = {!onPress}
            accessibilityRole={onPress ? 'button' : undefined}
            style = {({pressed}) => [
                styles.container, 
                pressed && styles.pressed
            ]}
        >

            {leading != null && (
                <View style = {styles.leading}>
                    {leading}
                </View>
            )}

            <View style = {styles.content}>
                <Text style= {styles.title}>{title}</Text>
                {desctiption && (
                    <Text style = {styles.description}>
                        {desctiption}
                    </Text>
                )}
            </View>

            {trailing != null && (
                <View style= {styles.trailing}>
                    {trailing}
                </View>
            )}
        </Pressable>
    )
} 

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 12,
    backgroundColor: AppColors.surface,
  },
  leading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  trailing: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.text,
  },
  description: {
    fontSize: 14,
    color: AppColors.muted,
  },
  pressed: {
    opacity: 0.7,
  },
});