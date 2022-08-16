/**
 * survey.js의 기본 타입들
 * 참조: https://surveyjs.io/Documentation/Library?id=Base#getType
 *
 * "boolean": 둘 중 하나 선택
 * "checkbox": 다중 선택
 * "comment": 주관식 문자열 입력. 여러 줄 입력 가능(text(single input)와 비교)
 * "dropdown": 드랍다운 형식으로 표시되고 한 개 선택
 * "expression": 읽기 전용인데 용도가 정확히 뭔지 모르겠음.
 * "file": 파일 업로드
 * "html": ??
 * "image": 이미지를 보여주기만 하는 것 같음. 문제가 아닌 것 같습니다.
 * "imagepicker": 여러 개 그림 중 하나 선택
 * "matrix": single choice matrix로 명명된 것 같고 여러 행이 나오는데 그 행에서 단 하나만 선택 가능
 * "matrixdropdown": multiple choice matrix로 명명된 것 같고 여러 행에 여러 열이 나올 수 있고 원하는대로 선택
 * "matrixdynamic": 여러 행을 추가/삭제할 수 있게 했고 열의 개수는 고정되어 있다.
 * "multipletext": 여러 개의 주관식 문자열 입력할 때
 * "panel": 여러 개의 질문을 넣을 수 있는 박스. 질문 안에 또 다른 질문을 넣을 때 사용??
 * "paneldynamic": 만드는 사람이 미리 만든 질문들을 add New 버튼을 클릭하면 생길 수 있도록 한 것.
 * "radiogroup": 라디오 버튼을 사용하여 한 개 선택 other를 선택하면 문자열 입력 가능
 * "rating": 별 점 줄 때
 * "ranking": 순위를 정할 때 사용; 드래그앤드랍 이용
 * "signaturepad": 사인 입력할 때
 * "text": 아마도 single input으로 변경된 것 같음. 이것은 한 문장 입력만 가능 comment는 여러 줄 입력 가능
 */
export enum QUESTION_TYPES {
  singletext = "짧은글",
  radio = "객관식",
  dropdown = "드롭다운",
  checkbox = "다중선택",
  file = "파일",
  rating = "점수",
  date = "날짜",
  // multitext = "긴글",
}

export function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string
): keyof T | null {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : null;
}
