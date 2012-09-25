/****************************************************************************
** Meta object code from reading C++ file 'sdatetime.h'
**
** Created: Thu 20. Sep 20:04:54 2012
**      by: The Qt Meta Object Compiler version 62 (Qt 4.7.3)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../sdatetime.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'sdatetime.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 62
#error "This file was generated using the moc from 4.7.3. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_SDateTime[] = {

 // content:
       5,       // revision
       0,       // classname
       0,    0, // classinfo
       6,   14, // methods
       0,    0, // properties
       2,   44, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // methods: signature, parameters, type, tag, flags
      25,   19,   11,   10, 0x02,
      54,   49,   44,   10, 0x02,
      85,   74,   70,   10, 0x02,
     106,   10,   11,   10, 0x02,
     115,   10,   11,   10, 0x02,
     124,   10,   70,   10, 0x02,

 // enums: name, flags, count, data
     135, 0x0,    4,   52,
     144, 0x0,    2,   60,

 // enum data: key, value
     153, uint(SDateTime::Hours),
     159, uint(SDateTime::Minutes),
     167, uint(SDateTime::Seconds),
     175, uint(SDateTime::All),
     179, uint(SDateTime::TwelveHours),
     191, uint(SDateTime::TwentyFourHours),

       0        // eod
};

static const char qt_meta_stringdata_SDateTime[] = {
    "SDateTime\0\0QString\0month\0longMonthName(int)\0"
    "bool\0year\0isLeapYear(int)\0int\0year,month\0"
    "daysInMonth(int,int)\0amText()\0pmText()\0"
    "hourMode()\0TimeUnit\0HourMode\0Hours\0"
    "Minutes\0Seconds\0All\0TwelveHours\0"
    "TwentyFourHours\0"
};

const QMetaObject SDateTime::staticMetaObject = {
    { &QObject::staticMetaObject, qt_meta_stringdata_SDateTime,
      qt_meta_data_SDateTime, 0 }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &SDateTime::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *SDateTime::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *SDateTime::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_SDateTime))
        return static_cast<void*>(const_cast< SDateTime*>(this));
    return QObject::qt_metacast(_clname);
}

int SDateTime::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        switch (_id) {
        case 0: { QString _r = longMonthName((*reinterpret_cast< int(*)>(_a[1])));
            if (_a[0]) *reinterpret_cast< QString*>(_a[0]) = _r; }  break;
        case 1: { bool _r = isLeapYear((*reinterpret_cast< int(*)>(_a[1])));
            if (_a[0]) *reinterpret_cast< bool*>(_a[0]) = _r; }  break;
        case 2: { int _r = daysInMonth((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2])));
            if (_a[0]) *reinterpret_cast< int*>(_a[0]) = _r; }  break;
        case 3: { QString _r = amText();
            if (_a[0]) *reinterpret_cast< QString*>(_a[0]) = _r; }  break;
        case 4: { QString _r = pmText();
            if (_a[0]) *reinterpret_cast< QString*>(_a[0]) = _r; }  break;
        case 5: { int _r = hourMode();
            if (_a[0]) *reinterpret_cast< int*>(_a[0]) = _r; }  break;
        default: ;
        }
        _id -= 6;
    }
    return _id;
}
QT_END_MOC_NAMESPACE
