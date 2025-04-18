import React, { useState, useMemo } from 'react';
import {
  TouchableOpacity,
  TextInput,
  Text,
  SafeAreaView,
  StatusBar,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { styles } from './styles';

const defaultDistance = 100;
const MOA = 2.91;

const SightZero = () => {
  const [distanceStr, setDistanceStr] = useState('');
  const [hOffsetStr, setHOffsetStr] = useState('');
  const [vOffsetStr, setVOffsetStr] = useState('');
  const [hDirection, setHDirection] = useState('');
  const [vDirection, setVDirection] = useState('');
  const [clickSizeStr, setClickSizeStr] = useState('');

  const distance = useMemo(() => parseFloat(distanceStr) || 0, [distanceStr]);
  const hOffset = useMemo(() => parseFloat(hOffsetStr) || 0, [hOffsetStr]);
  const vOffset = useMemo(() => parseFloat(vOffsetStr) || 0, [vOffsetStr]);
  const clickSize = useMemo(
    () => parseFloat(clickSizeStr) || 0,
    [clickSizeStr]
  );

  const hOffsetMOA = useMemo(() => {
    if (distance === 0) return 0;
    return (hOffset / MOA) * (defaultDistance / distance);
  }, [hOffset, distance]);

  const vOffsetMOA = useMemo(() => {
    if (distance === 0) return 0;
    return (vOffset / MOA) * (defaultDistance / distance);
  }, [vOffset, distance]);

  const hClicks = useMemo(() => {
    if (clickSize === 0) return 0;
    return hOffsetMOA / clickSize;
  }, [hOffsetMOA, clickSize]);

  const vClicks = useMemo(() => {
    if (clickSize === 0) return 0;
    return vOffsetMOA / clickSize;
  }, [vOffsetMOA, clickSize]);

  const handleReset = () => {
    setDistanceStr('');
    setHOffsetStr('');
    setVOffsetStr('');
    setClickSizeStr('');
    setHDirection('');
    setVDirection('');
  };

  const getOppositeDirection = (direction) => {
    if (direction === 'Left') return 'Right';
    if (direction === 'Right') return 'Left';
    if (direction === 'Up') return 'Down';
    if (direction === 'Down') return 'Up';
    return '';
  };

  const hAdjustmentDirection = useMemo(
    () => getOppositeDirection(hDirection),
    [hDirection]
  );
  const vAdjustmentDirection = useMemo(
    () => getOppositeDirection(vDirection),
    [vDirection]
  );

  const displayHOffsetMOA =
    isNaN(hOffsetMOA) || !isFinite(hOffsetMOA) ? '0.00' : hOffsetMOA.toFixed(2);
  const displayVClicks =
    isNaN(vClicks) || !isFinite(vClicks) ? '0.00' : vClicks.toFixed(2);
  const displayVOffsetMOA =
    isNaN(vOffsetMOA) || !isFinite(vOffsetMOA) ? '0.00' : vOffsetMOA.toFixed(2);
  const displayHClicks =
    isNaN(hClicks) || !isFinite(hClicks) ? '0.00' : hClicks.toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#000' barStyle='light-content' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%' }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps='handled'
        >
          <TextInput
            style={styles.input}
            editable
            inputMode='numeric'
            placeholder='Shooting distance, m'
            placeholderTextColor='#aaa'
            value={distanceStr}
            onChangeText={setDistanceStr}
          />

          <View style={styles.offsetRow}>
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() => setHDirection('Left')}
            >
              <Text
                style={[
                  styles.directionText,
                  hDirection === 'Left' ? styles.activeDirection : {},
                ]}
              >
                ←
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.inputOffset}
              editable
              inputMode='numeric'
              placeholder={`Impact Horiz, cm${
                hDirection ? ` (${hDirection})` : ''
              }`}
              placeholderTextColor='#aaa'
              value={hOffsetStr}
              onChangeText={setHOffsetStr}
            />
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() => setHDirection('Right')}
            >
              <Text
                style={[
                  styles.directionText,
                  hDirection === 'Right' ? styles.activeDirection : {},
                ]}
              >
                →
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.offsetRow}>
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() => setVDirection('Up')}
            >
              <Text
                style={[
                  styles.directionText,
                  vDirection === 'Up' ? styles.activeDirection : {},
                ]}
              >
                ↑
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.inputOffset}
              editable
              inputMode='numeric'
              placeholder={`Impact Vert, cm${
                vDirection ? ` (${vDirection})` : ''
              }`}
              placeholderTextColor='#aaa'
              value={vOffsetStr}
              onChangeText={setVOffsetStr}
            />
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() => setVDirection('Down')}
            >
              <Text
                style={[
                  styles.directionText,
                  vDirection === 'Down' ? styles.activeDirection : {},
                ]}
              >
                ↓
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            editable
            inputMode='numeric'
            placeholder='Click size, MOA'
            placeholderTextColor='#aaa'
            value={clickSizeStr}
            onChangeText={setClickSizeStr}
          />

          {/* Results Area - Table Format */}
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Adjustments Needed</Text>
            {/* Header Row - Optional but good for clarity */}
            <View style={styles.resultRow}>
              <Text style={[styles.resultHeaderCell, { flex: 1.5 }]}>Axis</Text>
              <Text style={[styles.resultHeaderCell, { flex: 1 }]}>MOA</Text>
              <Text style={[styles.resultHeaderCell, { flex: 1 }]}>Clicks</Text>
              <Text
                style={[
                  styles.resultHeaderCell,
                  { flex: 1.5, textAlign: 'right' },
                ]}
              >
                Direction
              </Text>
            </View>
            {/* Horizontal Results Row */}
            <View style={styles.resultRow}>
              <Text style={[styles.resultCell, styles.resultCellLabel]}>
                Horiz
              </Text>
              <Text style={[styles.resultCell, styles.resultCellValue]}>
                {displayHOffsetMOA}
              </Text>
              <Text
                style={[
                  styles.resultCell,
                  styles.resultCellValue,
                  { color: 'coral' },
                ]}
              >
                {displayHClicks}
              </Text>
              <Text style={[styles.resultCell, styles.resultCellDirection]}>
                {hAdjustmentDirection}
              </Text>
            </View>
            {/* Vertical Results Row */}
            <View style={styles.resultRow}>
              <Text style={[styles.resultCell, styles.resultCellLabel]}>
                Vert
              </Text>
              <Text style={[styles.resultCell, styles.resultCellValue]}>
                {displayVOffsetMOA}
              </Text>
              <Text
                style={[
                  styles.resultCell,
                  styles.resultCellValue,
                  { color: 'coral' },
                ]}
              >
                {displayVClicks}
              </Text>
              <Text style={[styles.resultCell, styles.resultCellDirection]}>
                {vAdjustmentDirection}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleReset} style={styles.button}>
            <Text style={styles.buttonLabel}>RESET</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SightZero;
