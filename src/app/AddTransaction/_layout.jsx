
import { Slot, Stack } from 'expo-router';

export default function AddTransactionLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title:' Add Transaction'}} />
      {/* <Slot /> */}
    </Stack>
  );
}

