// Real output of YOLO11n (detection) and YOLO11n-pose, run once on these two photos on 2026-11-21.
// Coordinates are pixels in the original 1280-wide images; joints below 0.5 confidence are left out.
// Nothing here is drawn by hand: the numbers are what the models said.

export type Joint = { name: string; x: number; y: number; conf: number }
export type Detection = { label: string; conf: number; box: [number, number, number, number] }
export type VisionShot = {
  width: number
  height: number
  subject: Detection & { joints: Joint[] }
  others: Detection[]
}

// COCO skeleton, as pairs of joint names.
export const skeleton: [string, string][] = [
  ["leftAnkle", "leftKnee"], ["leftKnee", "leftHip"], ["rightAnkle", "rightKnee"], ["rightKnee", "rightHip"],
  ["leftHip", "rightHip"], ["leftShoulder", "leftHip"], ["rightShoulder", "rightHip"], ["leftShoulder", "rightShoulder"],
  ["leftShoulder", "leftElbow"], ["rightShoulder", "rightElbow"], ["leftElbow", "leftWrist"], ["rightElbow", "rightWrist"],
  ["leftEye", "rightEye"], ["nose", "leftEye"], ["nose", "rightEye"], ["leftEye", "leftEar"], ["rightEye", "rightEar"],
  ["leftEar", "leftShoulder"], ["rightEar", "rightShoulder"],
]

export const beach: VisionShot = {
  width: 1280,
  height: 853,
  subject: {
    label: "person",
    conf: 0.93,
    box: [398, 110, 726, 844],
    joints: [
      { name: "nose", x: 584, y: 259, conf: 0.99 },
      { name: "leftEye", x: 599, y: 232, conf: 0.92 },
      { name: "rightEye", x: 540, y: 228, conf: 0.99 },
      { name: "rightEar", x: 472, y: 260, conf: 0.96 },
      { name: "leftShoulder", x: 523, y: 416, conf: 0.85 },
      { name: "rightShoulder", x: 532, y: 428, conf: 0.97 },
      { name: "rightElbow", x: 548, y: 709, conf: 0.81 },
      { name: "rightWrist", x: 688, y: 853, conf: 0.56 },
    ],
  },
  others: [
    { label: "person", conf: 0.84, box: [901, 291, 996, 604] },
    { label: "person", conf: 0.81, box: [1173, 284, 1277, 600] },
    { label: "person", conf: 0.79, box: [122, 286, 215, 564] },
    { label: "person", conf: 0.76, box: [1019, 283, 1106, 484] },
    { label: "person", conf: 0.75, box: [194, 315, 286, 562] },
    { label: "person", conf: 0.62, box: [28, 302, 90, 492] },
    { label: "person", conf: 0.59, box: [651, 301, 706, 445] },
    { label: "person", conf: 0.52, box: [0, 305, 37, 502] },
    { label: "person", conf: 0.43, box: [295, 298, 333, 422] },
    { label: "person", conf: 0.39, box: [697, 291, 729, 421] },
    { label: "person", conf: 0.38, box: [1140, 290, 1197, 456] },
    { label: "person", conf: 0.34, box: [87, 300, 134, 423] },
    { label: "person", conf: 0.31, box: [750, 285, 781, 387] },
  ],
}

export const stage: VisionShot = {
  width: 1280,
  height: 720,
  subject: {
    label: "person",
    conf: 0.89,
    box: [686, 375, 965, 652],
    joints: [
      { name: "nose", x: 838, y: 424, conf: 0.98 },
      { name: "leftEye", x: 850, y: 413, conf: 0.97 },
      { name: "rightEye", x: 833, y: 414, conf: 0.91 },
      { name: "leftEar", x: 882, y: 418, conf: 0.92 },
      { name: "leftShoulder", x: 923, y: 478, conf: 0.99 },
      { name: "rightShoulder", x: 826, y: 486, conf: 0.98 },
      { name: "leftElbow", x: 943, y: 568, conf: 0.95 },
      { name: "rightElbow", x: 793, y: 566, conf: 0.92 },
      { name: "leftWrist", x: 869, y: 545, conf: 0.92 },
      { name: "rightWrist", x: 740, y: 528, conf: 0.88 },
      { name: "leftHip", x: 899, y: 655, conf: 0.94 },
      { name: "rightHip", x: 829, y: 653, conf: 0.93 },
    ],
  },
  others: [
    { label: "tv", conf: 0.88, box: [2, 18, 493, 545] },
    { label: "laptop", conf: 0.31, box: [1143, 654, 1279, 719] },
    { label: "laptop", conf: 0.26, box: [725, 644, 981, 719] },
  ],
}
