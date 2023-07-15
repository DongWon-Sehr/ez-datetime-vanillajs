## ezDatetime 기능 명세서

- [x] **기능 1: ezDatetime 객체 생성**
  - `ezDatetime` 클래스를 사용하여 `ezDatetime` 객체를 생성합니다.
  - 기본적으로 현재 위치의 현재 시간을 가지고 있는 `ezDatetime` 객체를 반환합니다.
  - `targetDate`, `timezone` 파라미터를 전달하여 임의 시간을 가지고 있는 `ezDatetime` 객체를 반환합니다.

- [x] **기능 2: 타임존 설정**
  - `setTimezone(timezone)` 메서드를 사용하여 `ezDatetime` 객체의 타임존을 설정합니다.
  - `timezone` 매개변수에는 IANA 타임존 식별자 문자열을 전달합니다.
  - 설정된 타임존에 따라 `ezDatetime` 객체의 날짜와 시간이 표시됩니다.

- [ ] **기능 3: 날짜 포맷팅**
  - `format(formatString)` 메서드를 사용하여 `ezDatetime` 객체의 날짜와 시간을 원하는 형식으로 포맷팅합니다.
  - `formatString` 매개변수에는 포맷 지정자를 포함한 문자열을 전달합니다.
  - 지원되는 포맷 지정자로는 'yyyy' (연도), 'MM' (월), 'dd' (일), 'HH' (시간), 'mm' (분), 'ss' (초) 등이 있습니다.
  - 포맷된 문자열을 반환합니다.

- [ ] **기능 4: 날짜 수정하기**
  - `calculate(operation)` 메서드를 사용하여 `ezDatetime` 객체의 날짜를 더하거나 빼는 연산을 수행합니다.
  - `operation` 매개변수에는 날짜 연산을 나타내는 문자열을 전달합니다.
  - 연산 문자열은 '+1 day', '-3 months', '+ 48 hours'와 같은 형식으로 표현됩니다.
  - 연산된 날짜로 `ezDatetime` 객체가 업데이트되며, 수정된 객체를 반환합니다.

- [ ] **기능 5: 두 날짜의 차이 구하기**
  - `getDifference(otherDatetime, unit = 'second')` 메서드를 사용하여 두 `ezDatetime` 객체 사이의 차이를 구합니다.
  - `otherDatetime` 매개변수에는 비교할 다른 `ezDatetime` 객체를 전달합니다.
  - `unit` 매개변수에는 반환할 차이의 단위를 선택적으로 전달합니다. 기본값은 'second'입니다.
  - 지원되는 단위로는 'second' (초), 'minute' (분), 'hour' (시간), 'day' (일) 등이 있습니다.
  - 실수형으로 변환된 차이를 반환합니다.