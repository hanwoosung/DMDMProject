//package kr.co.dmdm.global;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.core.Ordered;
//import org.springframework.core.annotation.Order;
//import org.springframework.http.HttpInputMessage;
//import org.springframework.http.HttpOutputMessage;
//import org.springframework.http.MediaType;
//import org.springframework.http.converter.AbstractHttpMessageConverter;
//import org.springframework.http.converter.HttpMessageNotReadableException;
//import org.springframework.http.converter.HttpMessageNotWritableException;
//import org.springframework.stereotype.Component;
//import org.springframework.util.StreamUtils;
//
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//import java.util.Collections;
//import java.util.List;
//
//@Component
//@Slf4j
//@Order(Ordered.HIGHEST_PRECEDENCE)
//public class CommonHttpMessageConverter extends AbstractHttpMessageConverter<Response<Object>> {
//    private final ObjectMapper objectMapper;
//
//    public CommonHttpMessageConverter(ObjectMapper objectMapper) {
//        this.objectMapper = objectMapper;
//    }
//
//    @Override
//    public List<MediaType> getSupportedMediaTypes() {
//        return List.of(MediaType.APPLICATION_JSON);
//    }
//
//    @Override
//    protected boolean supports(Class<?> clazz) {
//        // TEXT_EVENT_STREAM MIME 타입은 처리하지 않음
//        return !MediaType.TEXT_EVENT_STREAM.equals(clazz)
//                && (clazz.equals(Response.class) || clazz.isPrimitive() || clazz.equals(String.class));
//    }
//
//    @Override
//    protected Response<Object> readInternal(Class<? extends Response<Object>> clazz, HttpInputMessage inputMessage)
//            throws IOException, HttpMessageNotReadableException {
//        throw new UnsupportedOperationException("writing 전용");
//    }
//
//    @Override
//    protected void writeInternal(Response<Object> resultMessage, HttpOutputMessage outputMessage)
//            throws IOException, HttpMessageNotWritableException {
//        String responseMessage = this.objectMapper.writeValueAsString(resultMessage);
//        StreamUtils.copy(responseMessage.getBytes(StandardCharsets.UTF_8), outputMessage.getBody());
//    }
//}