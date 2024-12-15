import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default defineComponent({
    name: 'EditAppointment',
    setup() {
        const store = useStore();
        const route = useRoute();
        const appointment = ref({
            title: '',
            date: '',
            hour: '',
            minute: '',
            meridiem: 'AM',
        });
        const appointmentId = route.params.id;
        const submitForm = async () => {
            if (appointment.value.title && appointment.value.date && appointment.value.hour && appointment.value.meridiem) {
                const formattedTime = `${appointment.value.hour}:${appointment.value.minute} ${appointment.value.meridiem}`;
                const updatedAppointment = {
                    id: appointmentId,
                    title: appointment.value.title,
                    date: appointment.value.date,
                    time: formattedTime,
                };
                try {
                    await store.dispatch('editAppointment', updatedAppointment);
                    appointment.value = { title: '', date: '', hour: '', minute: '', meridiem: 'AM' };
                }
                catch (error) {
                    console.error('Error updating appointment:', error);
                }
            }
            else {
                console.log('Please fill in all fields.');
            }
        };
        return {
            appointment,
            submitForm,
        };
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("max-w-2xl mx-auto mt-12 p-8 bg-white shadow-2xl rounded-lg") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-4xl font-bold text-center text-gray-800 mb-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.submitForm) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 gap-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("title"), ...{ class: ("block text-lg font-medium text-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ value: ((__VLS_ctx.appointment.title)), id: ("title"), type: ("text"), ...{ class: ("mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500") }, placeholder: ("Enter appointment title"), required: (true), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("date"), ...{ class: ("block text-lg font-medium text-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("date"), type: ("date"), ...{ class: ("mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500") }, required: (true), });
    (__VLS_ctx.appointment.date);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("time"), ...{ class: ("block text-lg font-medium text-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center space-x-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("hour"), type: ("number"), min: ("1"), max: ("12"), placeholder: ("HH"), ...{ class: ("mt-2 w-20 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500") }, required: (true), });
    (__VLS_ctx.appointment.hour);
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-3xl font-semibold") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ id: ("minute"), type: ("number"), min: ("0"), max: ("59"), placeholder: ("MM"), ...{ class: ("mt-2 w-20 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500") }, required: (true), });
    (__VLS_ctx.appointment.minute);
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.appointment.meridiem)), id: ("meridiem"), ...{ class: ("mt-2 p-4 w-24 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500") }, required: (true), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("AM"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("PM"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center mt-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500") }, });
    __VLS_styleScopedClasses['max-w-2xl'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['mt-12'];
    __VLS_styleScopedClasses['p-8'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['shadow-2xl'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['text-4xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['gap-6'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-4'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['w-20'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['w-20'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['w-24'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['mt-8'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['bg-indigo-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['hover:bg-indigo-700'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
let __VLS_self;
