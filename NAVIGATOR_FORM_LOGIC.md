# Project Navigator – Form Logic Documentation

Документация на логиките при попълване на формата Project Navigator (Draft.jsx). Описва как се променят полета и видимост при въвеждане на стойности.

---

## Модул „Your Configuration“

Отделен UI модул, обвързан с полета от формата. Показва се:
- **Desktop**: в дясната странична лента (sidebar)
- **Mobile**: под формата Cladding

### Обвързани полета

| Поле в формата | Роля в Your Configuration |
|----------------|----------------------------|
| `claddingType` | Определя кои QV Systems се показват (`availableQvSystems` – филтрирани според `claddingToQvSystems`) |
| `qvSystem` | Избран QV System – показва се като активна карта; при промяна се изчиства `qvVariant` |
| `qvVariant` | Избран вариант – показва се когато избраният system има variants (QV1, QV3, QV6, QV7, QV9) |
| `termsAccepted` | Checkbox – бутонът „Get quote“ е disabled докато не е отбелязан |

### Логика на модула

- **Systems**: Списъкът `availableQvSystems` зависи от `claddingType` (виж логика 2)
- **Variants**: Една логика за всички – когато има една система като опция, под нея се листват всички нейни варианти (QV3, QV7, QV9 и т.н.). При system без variants – показва се само описание.
- **Preview 3D**: Бутон за преглед, когато system/variant има `embedUrl`
- **Get quote**: Submit бутон – активен само при `termsAccepted === true`

---

## Текущи логики (имплементирани)

### 1. Story Height → Vertical Profile Lengths
- **Тригер**: Промяна на полето `storyHeight`
- **Действие**: Стойността се копира в:
  - `verticalProfileLengthMax`
  - `tProfileLength1`
  - `lProfileLength1`

### 2. Cladding Type → QV System (и Your Configuration)
- **Тригер**: Промяна на полето `claddingType`
- **Mapping**:
  | Cladding Type | QV System | Вариант |
  |---------------|-----------|---------|
  | AGROB BUCHTAL KeraTwin K20 | QV3 (автоматично) | по panel orientation |
  | Terracotta | QV7 (автоматично) | по panel orientation |
  | Aluminum | QV9 (автоматично) | всички варианти (QV9.3, QV9.5) |
  | Glass | Q-CLOUD (автоматично) | няма варианти |
  | Ceramic, Fiber cement, Fiber concrete, HPL, Stone | QV1, QV2, QV6 (филтрирани опции) | |
  | ACM 4 mm | QV1, QV2 (само тези системи) | |
- **Действие**: При фиксиран mapping – автоматично задава `qvSystem`, изчиства `qvVariant`. При филтрирани опции – изчиства избора ако текущият не е в allowed списъка.
- **Your Configuration**: Обновява списъка с QV Systems и избрания system в модула.

### 3. QV System → QV Variant
- **Тригер**: Промяна на полето `qvSystem`
- **Действие**: Изчиства `qvVariant` (потребителят трябва да избере вариант отново)
- **Your Configuration**: Показва се секция Variants (ако има) или описание на system (ако няма variants)

### 4. Insulation Thickness Mode → Cavity/Insulation
- **Тригер**: Промяна на checkbox `insulationThicknessMode`
- **Действие**: `cavityOrInsulation` = `'insulation'` ако checked, иначе `'cavity'`

### 5. Panel Orientation (условна видимост)
- **Условие**: Показва се само при `claddingType` = `AGROB BUCHTAL KeraTwin K20` или `Terracotta`
- **Опции**: Horizontal / Vertical
- **За KeraTwin K20 (QV3)**: Определя кои QV3 варианти се показват (виж логика 14)
- **За Terracotta (QV7)**: Определя кои QV7 варианти се показват по описание – Vertical/Horizontal в името (виж логика 15)

### 6. Material Density (условна видимост)
- **Тригер**: Checkbox `materialDensity`
- **Действие**: При checked показва полета Thickness и Density вместо Weight

### 7. Cavity Depth (отделен блок, по принципа на Wind load)
- **Блок**: Отделен блок със заглавие „Cavity Depth“ и info иконка за дефиниция
- **Полета**: Две полета за Cavity Depth (1 и 2) – cavityDepthMin, cavityDepthMax
- **Под тях**: „or Provide Insulation Thickness“ – checkbox
- **При checked**: Показват се полета за Insulation Thickness 1 и 2 (0–300 mm)
- **Валидация**: При Insulation – стойности 0–300 mm; при извън диапазона: „Insulation thickness should be between 0 and 300 mm“

### 8. Top Hat (условна видимост)
- **Тригер**: Radio `topHat` = `yes`
- **Действие**: Показва полета Thickness, Material, Depth за Top Hat Channel

### 9. Substrate Type → Substrate-specific fields
- **Stud**: Показва Thickness, Material (stud)
- **Steel work**: Показва Thickness, Material (steel)
- **Concrete**: Показва Concrete Grade
- **Masonry, Timber**: Без допълнителни полета
- **Подредба**: Допълнителните полета се отварят веднага под Substrate Type, преди Top Hat / C-Channel

### 10. Profile length validation (Vertical profiles)
- **T-Profile и L-Profile**: L1, L2, L3 трябва да са между 500 и 6000 mm
- При стойност извън диапазона: „Profile length should be between 500 and 6000 mm“

### 11. Wall Bracket sizes по тип
- **QVB aluminum**: 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300 – показват се като L-XX, в `wallBracketSize` се пази числото като string
- **QTB stainless steel**: 85, 100, 125, 150, 175, 200, 225, 250, 275, 300 – показват се като L-XX, в `wallBracketSize` се пази числото като string
- За изчисления: `Number(formData.wallBracketSize)`

### 12. Wind Load by Address (условна видимост)
- **Тригер**: Checkbox `windLoadByAddress`
- **Действие**: При checked показва Site Address и Postcode

---

## Нови логики (имплементирани)

### 13. Една логика за варианти в Your Configuration
- **Правило**: Когато има една система като опция (напр. QV3 за KeraTwin, QV7 за Terracotta, QV9 за Aluminum), под нея се листват вариантите на тази система.
- **Поведение**: Същото като QV7 – след избор на система се показват нейните варианти. За QV3 има допълнително филтриране по panel orientation (виж логика 14).

### 14. QV3 варианти по Panel Orientation (KeraTwin K20)
- **Условие**: `claddingType` = AGROB BUCHTAL KeraTwin K20 и `qvSystem` = QV3
- **Panel Orientation Vertical** → показват се само **QV3.3**, **QV3.4**
- **Panel Orientation Horizontal** → показват се само **QV3.1**, **QV3.2**
- **Panel Orientation не е избрано** → показват се всички варианти (QV3.1–3.4)
- **Тригер при промяна на panelOrientation**: Ако текущият `qvVariant` не е в новия списък – изчища се

### 15. QV7 варианти по Panel Orientation (Terracotta)
- **Условие**: `claddingType` = Terracotta и `qvSystem` = QV7
- **Panel Orientation Vertical** → показват се варианти, чието описание започва с „Vertical“ (QV7.3, QV7.5)
- **Panel Orientation Horizontal** → показват се варианти, чието описание започва с „Horizontal“ (QV7.1, QV7.2, QV7.4)
- **Panel Orientation не е избрано** → показват се всички варианти
- **Тригер при промяна на panelOrientation**: Ако текущият `qvVariant` не е в новия списък – изчища се

---

*Последна актуализация: 13.03.2025*
