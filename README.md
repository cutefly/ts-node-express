# Typescript Node Express

> https://blog.logrocket.com/how-to-set-up-node-typescript-express/

> https://millo-l.github.io/Nodejs-express-router-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/

## Sqids(구 Hashids)

> https://sqids.org/

### 유형별 최대값(sqids를 8자리로 고정)

```text
# 알파뱃 대소문자, 숫자(총 62개 문자)
# alphabet : vPQ0MdX1YSu7nkU5WJDzRwGEqFxcZAjB3KgNoiTV6lm294bCIpOthyHa8sLref
3,142,742,836,020 => pppppppp

# 알파뱃 대소문자, 숫자(총 54개 문자 : 혼동이 될 수 있는 문자 i, l, o, I, L, O, 0, 1 제외)
# alphabet : WBgKVACxUeHamzRYvZrwfSET29hqJM78nFPtd5pc3G6DQsykjNuX4b
1,174,711,139,836 => XXXXXXXX

# 알파벳 대문자, 수장(총 36개 문자)
# alphabet : PNZX081GJHC725TSLFEU96KIQRWB4DYVOM3A
64,339,296,874 => 55555555
```

### 고려사항

```text
시퀀스 숫자를 베이스로 하여 인코딩을 한다.
보안성이 필요한 정보에는 사용하지 않는다.
alphabet 값을 shuffling 하여 값을 유추하기 어렵도록 할 수 있다.
인코딩한 값에 동일한 문자열이 반복될 수도 있다.
```

## Hashids

```text
sqids와 달리 salt 값을 지정할 수 있음.
salt값과 alphabet 값을 shuffling하여 값을 유축하기 어렵게 할 수 있다.
salt값에 의해 hashids의 길이가 달라지지는 않는다.
```
