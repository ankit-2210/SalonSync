package com.bookingservice.service.Impl;

import com.bookingservice.payload.dto.BookingReportDto;
import com.bookingservice.service.JasperReportService;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JasperReportServiceImpl implements JasperReportService {

    @Override
    public byte[] generateBookingPdf(BookingReportDto bookingReportDto) {
        try {
            InputStream reportStream = getClass().getResourceAsStream("/reports/salon_report.jrxml");
            if (reportStream == null) {
                throw new RuntimeException("JRXML file not found");
            }
            JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

            // MAIN REPORT DATASOURCE
            JRBeanCollectionDataSource mainDataSource = new JRBeanCollectionDataSource(Collections.singletonList(bookingReportDto));

            // SERVICES DATASOURCE
            JRBeanCollectionDataSource servicesDataSource =
                    new JRBeanCollectionDataSource(
                            bookingReportDto.getServiceDtoList());

            // PARAMETERS
            Map<String, Object> params = new HashMap<>();
            params.put("SERVICES_DATASOURCE", servicesDataSource);

            // FILL REPORT
            JasperPrint jasperPrint =
                    JasperFillManager.fillReport(
                            jasperReport,
                            params,
                            mainDataSource
                    );

            // EXPORT PDF
            return JasperExportManager.exportReportToPdf(jasperPrint);

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Booking Details generation failed: " + e.getMessage(),
                    e
            );
        }
    }
}