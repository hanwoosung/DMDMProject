package kr.co.dmdm.config;

import kr.co.dmdm.type.AlarmType;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration().setFieldMatchingEnabled(true).setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);

        // Enum -> String 변환 컨버터
        Converter<AlarmType, String> enumToStringConverter = new Converter<>() {
            @Override
            public String convert(MappingContext<AlarmType, String> context) {
                return context.getSource() != null ? context.getSource().name() : null;
            }
        };

        // String -> Enum 변환 컨버터
        Converter<String, AlarmType> stringToEnumConverter = new Converter<>() {
            @Override
            public AlarmType convert(MappingContext<String, AlarmType> context) {
                return context.getSource() != null ? AlarmType.valueOf(context.getSource()) : null;
            }
        };

        // AlarmRequestDto -> Alarm 매핑 설정
        modelMapper.typeMap(kr.co.dmdm.dto.Alarm.request.AlarmRequestDto.class, kr.co.dmdm.entity.Alarm.class)
                .addMappings(mapper -> mapper.using(enumToStringConverter).map(
                        kr.co.dmdm.dto.Alarm.request.AlarmRequestDto::getAlarmType,
                        kr.co.dmdm.entity.Alarm::setAlarmType
                ));

        // Alarm -> AlarmRequestDto 매핑 설정
        modelMapper.typeMap(kr.co.dmdm.entity.Alarm.class, kr.co.dmdm.dto.Alarm.request.AlarmRequestDto.class)
                .addMappings(mapper -> mapper.using(stringToEnumConverter).map(
                        kr.co.dmdm.entity.Alarm::getAlarmType,
                        kr.co.dmdm.dto.Alarm.request.AlarmRequestDto::setAlarmType
                ));

        return modelMapper;
    }
}